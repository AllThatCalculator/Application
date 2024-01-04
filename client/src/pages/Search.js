import { useState, useEffect } from "react";
import { Divider, Grid, Pagination, Typography } from "@mui/material";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/organisms/common/PageScreenBox";
import Title from "../components/organisms/common/Title";
import useSx from "../hooks/useSx";
import { FlexBox } from "../components/organisms/common/FlexBox";
import { useDispatch, useSelector } from "react-redux";
import { onSetSearchResult, onSetSearchResultCount } from "../modules/search";
import usePage from "../hooks/usePage";
import useGetUrlParam from "../hooks/useGetUrlParam";
import getCalculetFind from "../user-actions/calculets/getCalculetFind";
import getSearchRequestBody from "../utils/getSearchRequestBody";
import SearchFilter from "../components/organisms/common/SearchFilter";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../utils/changeCategorySelect";
import SearchSkeletonPage from "../components/organisms/search/SearchSkeletonPage";
import SearchCalculetList from "../components/organisms/common/SearchCalculetList";

async function getCalculetResult(
  setIsLoading,
  categoryMainId,
  categorySubId,
  searchUrlId,
  resultLimit,
  pageNum,
  searchTarget
) {
  let result;
  await setIsLoading(true);

  // get result
  await getCalculetFind(
    getSearchRequestBody(
      categoryMainId,
      categorySubId,
      searchUrlId,
      resultLimit,
      pageNum,
      searchTarget
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
  const { searchOptionPage } = usePage();

  const { resultList, count: resultCount } = useSelector((state) => ({
    resultList: state.search.resultList,
    count: state.search.count,
  }));

  /**
   * 현재 url에서 id 뽑아 내기
   * - searchUrlId : 검색 키워드
   */
  let {
    searchUrlId,
    categoryMainUrlId,
    categorySubUrlId,
    lenUrlId,
    targetUrlId,
  } = useGetUrlParam();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

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
  // target (default : all)
  const KEY_DEFAULT_TARGET = "all";
  const [searchTarget, setSearchTarget] = useState(
    targetUrlId !== null ? targetUrlId : KEY_DEFAULT_TARGET
  );

  // limit control
  function handleResultLimitChange(event) {
    let value = event.target.value;
    setResultLimit(value);
    // update
    searchOptionPage(
      searchUrlId,
      categoryMainId,
      categorySubId,
      value,
      searchTarget
    );
  }

  // main control
  function handleChangeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;
    changeCategoryMain(value, setCategoryMainId, setCategorySubId);
    // update
    searchOptionPage(
      searchUrlId,
      value,
      categorySubId,
      resultLimit,
      searchTarget
    );
  }

  // sub control
  function handleChangeCategorySub(event) {
    // 소분류 타겟 value 값
    let value = event.target.value;
    changeCategorySub(value, setCategorySubId);
    // update
    searchOptionPage(
      searchUrlId,
      categoryMainId,
      value,
      resultLimit,
      searchTarget
    );
  }

  // target control
  function handleChangeSearchTarget(event) {
    let value = event.target.value;
    setSearchTarget(value);
    // update
    searchOptionPage(
      searchUrlId,
      categoryMainId,
      categorySubId,
      resultLimit,
      value
    );
  }

  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    // get result
    getCalculetResult(
      setIsLoading,
      categoryMainId,
      categorySubId,
      searchUrlId,
      resultLimit,
      currentPage,
      searchTarget
    ).then((res) => {
      dispatch(onSetSearchResult(res.calculetList));
      dispatch(onSetSearchResultCount(res.count));
    });
  }, [
    searchUrlId,
    categoryMainId,
    categorySubId,
    resultLimit,
    currentPage,
    searchTarget,
    dispatch,
  ]);

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

        {/* 필터 */}
        <SearchFilter
          searchTarget={searchTarget}
          handleChangeSearchTarget={handleChangeSearchTarget}
          categoryMainId={categoryMainId}
          handleChangeCategoryMain={handleChangeCategoryMain}
          categorySubId={categorySubId}
          handleChangeCategorySub={handleChangeCategorySub}
          resultLimit={resultLimit}
          handleResultLimitChange={handleResultLimitChange}
        />

        <Divider />
        {!isLoading && <SearchCalculetList calculetList={resultList} />}
        {isLoading && <SearchSkeletonPage />}
        <Grid container sx={{ w: 1, mt: "6.4rem", justifyContent: "center" }}>
          <Pagination
            count={
              // 전체 0일 경우 1 || 전체 / size
              resultCount === 0 ? 1 : Math.ceil(resultCount / resultLimit)
            }
            page={currentPage}
            onChange={handleCurrentPageChange}
          />
        </Grid>
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Search;
