import { useEffect, useRef } from "react";
import { useState } from "react";
import { AppBar, Grid } from "@mui/material";
import { PageScreenBox } from "../components/global-components/PageScreenBox";
import { FlexColumnBox } from "../components/global-components/FlexBox";
import Title from "../components/global-components/Title";
import { useSelector } from "react-redux";
import useTabs from "../hooks/useTabs";
import { ID_MAIN_CATEGORY_TAB } from "../constants/calculetList";
import CalculetListContent from "../components/calculet-list/CalculetListContent";
import {
  FloatingTab,
  FloatingTabs,
} from "../components/atom-components/StyledTabs";
import useGetUrlParam from "../hooks/useGetUrlParam";
import CalculetSubList from "./CalculetSubList";

/**
 * 계산기 전체 목록 페이지
 */
function CalculetList() {
  // 소분류로 가도록
  const { categoryMain } = useGetUrlParam();

  // (1) 선언
  // (2) 할당 -> 컴포넌트 렌더될 때 할당
  // (3) 사용 -> mainCategoryRef.current[index]? 있는지 확인 필수
  // offset : mainCategoryRef.current[index]?.offsetTop
  const mainCategoryRef = useRef([]);
  function onClickMoveToElement(index) {
    mainCategoryRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /** tabs로 관리되는 값들 */
  const { values: mainCategoryTabs, onChange: onChangeMainCategoryTabs } =
    useTabs({
      mainCategoryTab: 0, // 대분류 tabs (default Id : 0)
    });
  const { mainCategoryTab } = mainCategoryTabs;
  /** 스크롤 위치에 따라 tab 색 바뀜 */
  const [mainCategoryTabActive, setMainCategoryTabActive] = useState(0);

  // 스크롤 위치
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
  // 스크롤 위치 변화에 따라 'scrollPosition' 변화
  function updateScroll() {
    setScrollPosition(window.pageYOffset);
  }
  /**
   * 스크롤 위치 감지
   * 이벤트 등록 후, clean up 을 위해 return 에서 이벤트 제거
   */
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [scrollPosition]);

  function handleActiveMainCategoryTab() {
    const mainCategoryCurrentRef = mainCategoryRef.current;
    const currentScrollY = Math.round(scrollPosition); // 현재 스크롤 위치

    for (let i = 0; i < mainCategoryCurrentRef.length; i++) {
      const offsetTop = mainCategoryCurrentRef[i]?.offsetTop;
      const nextOffsetTop = mainCategoryCurrentRef[i + 1]?.offsetTop;

      if (
        (currentScrollY >= offsetTop && currentScrollY < nextOffsetTop) ||
        (i === mainCategoryCurrentRef.length - 1 && currentScrollY >= offsetTop)
      ) {
        setMainCategoryTabActive(i);
      }
    }
  }
  useEffect(() => {
    handleActiveMainCategoryTab();
  }, [scrollPosition]);

  const { calculetCategory, calculetList } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
    calculetList: state.calculetList,
  }));

  /**
   * category list를 useState로 관리
   * [X]scrollHook : => hook은 조건, 루프절에서 사용 못 함
   *     대분류 이름 :
   *     대분류 id :
   *     subContent : {
   *                     소분류 이름 :
   *                     소분류 id :
   *                     소분류 list :
   *                  }
   */
  const [calculetListContent, setCalculetListContent] = useState([]);
  useEffect(() => {
    // 세팅
    if (!(!!calculetList && !!calculetCategory)) return;
    setCalculetListContent([]);

    // 01. 대분류
    let mainResult = [];
    for (let [mainId, mainContent] of Object.entries(calculetCategory)) {
      const { name: mainCategoryName, ...subContent } = mainContent;

      // 02. 소분류
      let subResult = [];
      for (let [subId, subCategoryName] of Object.entries(subContent)) {
        // 소분류 이름, id, 소분류에 맞는 calculet list
        subResult.push({
          subCategoryName: subCategoryName,
          subId: subId,
          subCalculetList:
            // key 있는지 확인하고 리스트 push
            calculetList.hasOwnProperty(mainId) &&
            calculetList[mainId].hasOwnProperty(subId)
              ? calculetList[mainId][subId].slice(0, 6) // 6개
              : [],
        });
      }
      // 대분류 이름, id, 소분류 content
      mainResult.push({
        mainCategoryName: mainCategoryName,
        mainId: mainId,
        subContent: subResult,
      });
    }
    setCalculetListContent(mainResult);
  }, [calculetList, calculetCategory]);

  return (
    <>
      {categoryMain === undefined ? (
        calculetListContent.length !== 0 && (
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
              <PageScreenBox sx={{ padding: "1.2rem 0.8rem 0" }} gap="0.4rem">
                <Title content="계산기 전체 목록" />
                <FloatingTabs
                  value={mainCategoryTab}
                  onChange={onChangeMainCategoryTabs}
                  variant="scrollable"
                >
                  {calculetListContent.map((content, index) => {
                    const { mainCategoryName, mainId } = content;
                    return (
                      <FloatingTab
                        id={ID_MAIN_CATEGORY_TAB}
                        key={"id-main-category-tab" + mainCategoryName}
                        label={mainCategoryName}
                        value={index}
                        onClick={() => onClickMoveToElement(index)}
                        isActive={mainCategoryTabActive === index}
                      />
                    );
                  })}
                </FloatingTabs>
              </PageScreenBox>
            </AppBar>
            <Grid container sx={{ backgroundColor: "white" }}>
              <PageScreenBox sx={{ p: "16rem 0.8rem 100rem" }}>
                <FlexColumnBox>
                  {calculetListContent.map((content, index) => {
                    const { mainId } = content;

                    return (
                      <FlexColumnBox
                        key={"id-main-category-" + mainId}
                        sx={{ pt: "4rem" }}
                        gap="4rem"
                        // (2) 할당
                        ref={(element) =>
                          (mainCategoryRef.current[index] = element)
                        }
                      >
                        <CalculetListContent calculetContent={content} />
                      </FlexColumnBox>
                    );
                  })}
                </FlexColumnBox>
              </PageScreenBox>
            </Grid>
          </>
        )
      ) : (
        <CalculetSubList />
      )}
    </>
  );
}
export default CalculetList;
