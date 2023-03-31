import { useState, useEffect } from "react";
import { Divider, Grid, Pagination, Typography } from "@mui/material";
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
import getCalculetFind from "../user-actions/calculets/getCalculetFind";
import getSearchRequestBody from "../utils/getSearchRequestBody";
import SkeletonPage from "../components/search/SkeletonPage";
import TotalCount from "../components/atom-components/TotalCount";
import SearchFilter from "../components/global-components/SearchFilter";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../utils/changeCategorySelect";

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

  // const SELECT_BOX_WIDTH = 132;

  const { subTitleSx } = useSx();
  const { calculetIdPage, searchOptionPage } = usePage();

  const { resultList, count: resultCount } = useSelector((state) => ({
    resultList: state.search.resultList,
    count: state.search.count,
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

  function handleResultLimitChange(event) {
    let value = event.target.value;
    setResultLimit(value);
    // update
    searchOptionPage(searchUrlId, categoryMainId, categorySubId, value);
  }

  function handleChangeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;
    changeCategoryMain(value, setCategoryMainId, setCategorySubId);
    // update
    searchOptionPage(searchUrlId, value, categorySubId, resultLimit);
  }

  function handleChangeCategorySub(event) {
    // 소분류 타겟 value 값
    let value = event.target.value;
    changeCategorySub(value, setCategorySubId);
    // update
    searchOptionPage(searchUrlId, categoryMainId, value, resultLimit);
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
            {/* 필터된 건수 */}
            <TotalCount length={resultCount} />
          </Grid>
          <Grid item>
            {/* 필터 */}
            <SearchFilter
              categoryMainId={categoryMainId}
              handleChangeCategoryMain={handleChangeCategoryMain}
              categorySubId={categorySubId}
              handleChangeCategorySub={handleChangeCategorySub}
              resultLimit={resultLimit}
              handleResultLimitChange={handleResultLimitChange}
            />
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
