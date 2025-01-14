import { useEffect } from "react";
import { useState } from "react";
import { AppBar, Grid, Pagination, Tab, Tabs } from "@mui/material";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import { FlexColumnBox } from "../components/organisms/common/FlexBox";
import Title from "../components/organisms/common/Title";
import { useSelector } from "react-redux";
import useTabs from "../hooks/useTabs";
import {
  ID_MAIN_CONVERTER,
  ID_MAIN_ETC,
  ID_SUB_CATEGORY_TAB,
} from "../constants/calculetList";
import useGetUrlParam from "../hooks/useGetUrlParam";
import usePage from "../hooks/usePage";
import getSearchRequestBody from "../utils/getSearchRequestBody";
import getCalculetFind from "../user-actions/calculets/getCalculetFind";
import TotalCount from "../components/organisms/common/TotalCount";
import SearchCalculetList from "../components/organisms/common/SearchCalculetList";
import SearchSkeletonPage from "../components/organisms/search/SearchSkeletonPage";
import { MoveTopFab } from "../components/organisms/common/StyledFabs";
import useScrollPosition from "../hooks/useScrollPosition";

// get calculet list
async function getCalculetResult(
  setIsLoading,
  categoryMainId,
  categorySubId,
  resultLimit,
  pageNum
) {
  let result;
  await setIsLoading(true);

  // get result
  await getCalculetFind(
    getSearchRequestBody(
      categoryMainId,
      categorySubId,
      "",
      resultLimit,
      pageNum,
      ""
    )
  ).then((res) => {
    result = res;
  });

  await setIsLoading(false);
  return result;
}

/**
 * 계산기 소분류 페이지
 */
function CalculetSubList() {
  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
  }));

  const { calculetListPage } = usePage();
  // 무슨 대분류인지
  const { categoryMain } = useGetUrlParam();

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // result limit (default : 20)
  const KEY_DEFAULT_LEN = 20;
  // const [KEY_DEFAULT_LEN, setResultLimit] = useState(KEY_DEFAULT_LEN);
  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };
  const [calculetSubListContent, setCalculetSubListContent] = useState([]);
  const [calculetSubCount, setCalculetSubCount] = useState(0);

  /** tabs로 관리되는 값들 */
  const { values: subCategoryTabs, onChange: onChangeSubCategoryTabs } =
    useTabs({
      subCategoryTab:
        //소분류 tabs : default Id 단위 변환기 ID
        // 단위변환기 ? 첫 번째 대분류 ID
        // 기타 ? 기타 ID
        categoryMain === ID_MAIN_CONVERTER
          ? Object.keys(calculetCategory[ID_MAIN_CONVERTER])[0]
          : categoryMain === ID_MAIN_ETC
          ? ID_MAIN_ETC
          : ID_MAIN_CONVERTER,
    });
  const { subCategoryTab } = subCategoryTabs;
  const [calculetSubCategoryContent, setCalculetSubCategoryContent] = useState(
    []
  );
  useEffect(() => {
    // 세팅
    if (Object.keys(calculetCategory).length === 0) return;
    setCalculetSubCategoryContent([]);

    let result = [];
    for (let [subId, subName] of Object.entries(
      calculetCategory[categoryMain]
    )) {
      if (subId !== "name") {
        result.push({
          subId: subId,
          subCategoryName: subName,
        });
      }
    }
    setCalculetSubCategoryContent(result);
  }, [categoryMain, calculetCategory]);

  useEffect(() => {
    let requestCategoryMainId =
      categoryMain === ID_MAIN_CONVERTER ? subCategoryTab : categoryMain; // 대분류가 단위변환기면 -> 대분류, 소분류 바꿔서 요청
    let requestCategorySubId =
      categoryMain === ID_MAIN_CONVERTER ? categoryMain : subCategoryTab;
    // (categoryMain === ID_MAIN_ETC ? ID_MAIN_ETC : subCategoryTab); // 대분류가 기타면 소분류도 기타
    // console.log(requestCategoryMainId);
    // console.log(subCategoryTab);
    // get result
    getCalculetResult(
      setIsLoading,
      requestCategoryMainId,
      requestCategorySubId,
      KEY_DEFAULT_LEN,
      currentPage
    ).then(({ calculetList, count }) => {
      // console.log(calculetList);
      setCalculetSubListContent(calculetList);
      setCalculetSubCount(count);
    });
  }, [categoryMain, subCategoryTab, KEY_DEFAULT_LEN, currentPage]);
  // console.log(subCategoryTab);
  // console.log(calculetSubListContent);

  const { scrollPosition, updateScroll, isMoveScroll, topScroll } =
    useScrollPosition();
  /**
   * 스크롤 위치 감지
   * 이벤트 등록 후, clean up 을 위해 return 에서 이벤트 제거
   */
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [updateScroll, scrollPosition]);

  return (
    <>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          backgroundColor: "white",
          opacity: "90%",
          paddingTop: "6.4rem",
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <PageScreenBox
          sx={{
            padding:
              categoryMain !== ID_MAIN_ETC
                ? "1.2rem 0.8rem 0"
                : "1.2rem 0.8rem 1.2rem",
          }}
          gap="0.4rem"
        >
          <Title
            content={calculetCategory[categoryMain].name}
            isPage
            onClickPage={calculetListPage}
          />
          {categoryMain !== ID_MAIN_ETC && (
            <Tabs
              value={subCategoryTab}
              onChange={onChangeSubCategoryTabs}
              variant="scrollable"
            >
              {calculetSubCategoryContent.map((content, index) => {
                const { subCategoryName, subId } = content;

                return (
                  <Tab
                    id={ID_SUB_CATEGORY_TAB}
                    key={`id-sub-category-tab-${subCategoryName}`}
                    label={subCategoryName}
                    value={subId}
                  />
                );
              })}
            </Tabs>
          )}
        </PageScreenBox>
      </AppBar>
      <Grid container sx={{ backgroundColor: "white" }}>
        <PageScreenBox
          sx={{
            p:
              categoryMain !== ID_MAIN_ETC
                ? "20rem 0.8rem 36rem"
                : "16rem 0.8rem 36rem",
          }}
        >
          <FlexColumnBox gap="2.4rem">
            <TotalCount length={calculetSubCount} />
            {!isLoading && (
              <SearchCalculetList calculetList={calculetSubListContent} />
            )}
            {isLoading && <SearchSkeletonPage />}
            <Grid
              container
              sx={{ w: 1, mt: "6.4rem", justifyContent: "center" }}
            >
              <Pagination
                count={
                  // 전체 0일 경우 1 || 전체 / size
                  calculetSubCount === 0
                    ? 1
                    : Math.ceil(calculetSubCount / KEY_DEFAULT_LEN)
                }
                page={currentPage}
                onChange={handleCurrentPageChange}
              />
            </Grid>
          </FlexColumnBox>
        </PageScreenBox>
      </Grid>
      <MoveTopFab isActive={isMoveScroll()} onClick={topScroll} />
    </>
  );
}
export default CalculetSubList;
