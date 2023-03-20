import { useState, useEffect } from "react";
import {
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import useSx from "../hooks/useSx";
import { FlexBox } from "../components/global-components/FlexBox";
import { useDispatch, useSelector } from "react-redux";
import { onSetSearchResult, onSetSearchResultCount } from "../modules/search";
import BoxCalculetItem from "../components/atom-components/BoxCalculetItem";
import usePage from "../hooks/usePage";
import BoxNoItem from "../components/atom-components/BoxNoItem";
import useGetUrlParam from "../hooks/useGetUrlParam";
import getCalculetFind from "../user-actions/getCalculetFind";
import getSearchRequestBody from "../utils/getSearchRequestBody";
import SkeletonPage from "../components/search/SkeletonPage";

const KEY_TOTAL_MAIN = "대분류 전체";
const KEY_TOTAL_SUB = "소분류 전체";

async function getCalculetResult(
  setIsLoading,
  categoryMainId,
  categorySubId,
  searchUrlId,
  resultLimit
) {
  let result;
  await setIsLoading(true);

  // get result
  await getCalculetFind(
    getSearchRequestBody(
      categoryMainId,
      categorySubId,
      searchUrlId,
      resultLimit
    )
  ).then((res) => {
    result = res;
  });

  await setIsLoading(false);
  return result;
}

/**
 * 검색 리스트 페이지
 */
function Search() {
  /** Redux Dispatch */
  const dispatch = useDispatch();

  const SELECT_BOX_WIDTH = 132;

  const { subTitleSx } = useSx();
  const { calculetIdPage, searchOptionPage } = usePage();

  const {
    resultList,
    count: resultCount,
    calculetCategory,
  } = useSelector((state) => ({
    resultList: state.search.resultList,
    count: state.search.count,
    calculetCategory: state.calculetCategory.category,
  }));

  /**
   * 현재 url에서 id 뽑아 내기
   * - searchUrlId : 검색 키워드
   */
  let { searchUrlId, categoryMainUrlId, categorySubUrlId, lenUrlId } =
    useGetUrlParam();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  // 선택된 대분류, 소분류 id
  const [categoryMainId, setCategoryMainId] = useState(
    categoryMainUrlId !== null ? categoryMainUrlId : ""
  );
  const [categorySubId, setCategorySubId] = useState(
    categorySubUrlId !== null ? categorySubUrlId : ""
  );
  // result limit (default : 20)
  const KEY_DEFAULT_LEN = 20;
  const [resultLimit, setResultLimit] = useState(
    lenUrlId !== null ? lenUrlId : KEY_DEFAULT_LEN
  );
  const handleResultLimitChange = (event) => {
    let value = event.target.value;
    setResultLimit(value);

    // update
    searchOptionPage(searchUrlId, categoryMainId, categorySubId, value);
  };

  /**
   * 계산기 대분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
   * @param {*} event
   */
  function changeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;

    const targetValue = value !== "" ? Number(value) : "";
    setCategoryMainId(targetValue);
    setCategorySubId(""); // 초기화

    // update
    searchOptionPage(searchUrlId, targetValue, categorySubId, resultLimit);
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeCategorySub(event) {
    let value = event.target.value;

    const targetValue = value !== "" ? Number(value) : "";
    setCategorySubId(targetValue);

    // update
    searchOptionPage(searchUrlId, categoryMainId, targetValue, resultLimit);
  }

  useEffect(() => {
    // get result
    getCalculetResult(
      setIsLoading,
      categoryMainId,
      categorySubId,
      searchUrlId,
      resultLimit
    ).then((res) => {
      dispatch(onSetSearchResult(res.calculetList));
      dispatch(onSetSearchResultCount(res.count));
    });
  }, [searchUrlId, categoryMainId, categorySubId, resultLimit, dispatch]);

  /**
   * 소분류 카테고리 나열
   * @param {object} sub 소분류 카테고리 정보 (categorySub, subItems)
   * @param {string} mainId 해당 소분류의 대분류가 '기타 : 99999' 인지 확인 & 소분류 구분하기 위한 대분류 id
   */
  function handleResultList() {
    return (
      <Grid
        container
        spacing={4}
        columns={{ xs: 1, sm: 2, md: 3 }}
        sx={{ alignContent: "stretch" }}
      >
        {resultList.length !== 0 ? (
          resultList.map((calculet) => (
            <Grid key={calculet.id} item xs={1} sm={1} md={1}>
              <BoxCalculetItem
                onClick={() => calculetIdPage(calculet.id)}
                calculet={calculet}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={1} sm={1} md={1}>
            <BoxNoItem />
          </Grid>
        )}
      </Grid>
    );
  }

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="1.6rem">
        <Title content="검색 결과" />
        <FlexBox>
          <Typography sx={{ ...subTitleSx }} color="info.main">
            '{searchUrlId}'
          </Typography>
          <Typography sx={{ ...subTitleSx }}>
            에 대한 {resultCount}개의 검색 결과
          </Typography>
        </FlexBox>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs>
            <FlexBox>
              <Typography variant="body1">전체</Typography>
              <Typography variant="body1" color="info.main">
                {` ${resultCount} `}
              </Typography>
              <Typography variant="body1">건</Typography>
            </FlexBox>
          </Grid>
          <Grid item>
            <FlexBox gap="0.4rem">
              <FormControl size="small" sx={{ width: SELECT_BOX_WIDTH }}>
                <Select
                  value={categoryMainId}
                  onChange={changeCategoryMain}
                  displayEmpty
                  renderValue={
                    categoryMainId !== "" ? undefined : () => KEY_TOTAL_MAIN
                  }
                  sx={{ color: categoryMainId === "" && "text.disabled" }}
                >
                  <MenuItem key="total-main" value="">
                    {KEY_TOTAL_MAIN}
                  </MenuItem>
                  {calculetCategory &&
                    Object.entries(calculetCategory).map((data) => {
                      const mainId = Number(data[0]);
                      const mainName = data[1].name;
                      return (
                        <MenuItem key={mainId} value={mainId}>
                          {mainName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl
                disabled={categoryMainId === ""}
                size="small"
                sx={{ width: SELECT_BOX_WIDTH }}
              >
                <Select
                  value={categorySubId}
                  onChange={changeCategorySub}
                  displayEmpty
                  renderValue={
                    categorySubId !== "" ? undefined : () => KEY_TOTAL_SUB
                  }
                  sx={{ color: categorySubId === "" && "text.disabled" }}
                >
                  <MenuItem key="total-sub" value="">
                    {KEY_TOTAL_SUB}
                  </MenuItem>
                  {calculetCategory &&
                    Object.entries(calculetCategory).map((data) => {
                      const mainId = Number(data[0]);
                      const mainValue = data[1];
                      const { name, ...subList } = mainValue; // name 제외하고 순회

                      return (
                        mainId === Number(categoryMainId) &&
                        subList &&
                        Object.entries(subList).map((subData) => {
                          const key = Number(subData[0]);
                          const value = subData[1];
                          return (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          );
                        })
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ width: 82 }}>
                <Select value={resultLimit} onChange={handleResultLimitChange}>
                  {[20, 40, 60].map((data) => (
                    <MenuItem key={data} value={data}>
                      {data}개
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FlexBox>
          </Grid>
        </Grid>
        <Divider />
        {!isLoading && handleResultList()}
        {isLoading && <SkeletonPage />}
        <Grid container sx={{ w: 1, mt: "6.4rem", justifyContent: "center" }}>
          <Pagination
            count={1}
            page={currentPage}
            onChange={handleCurrentPageChange}
          />
        </Grid>
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Search;
