import CalculetItemList from "../components/calculet-list/CalculetItemList";
import Shortcut from "../components/calculet-list/Shortcut";
import useMoveScroll from "../hooks/useMoveScroll";
import { useEffect } from "react";
import { useState } from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import IsoIcon from "@mui/icons-material/Iso";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TodayIcon from "@mui/icons-material/Today";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grid } from "@mui/material";
import { PageScreenBox } from "../components/global-components/PageScreenBox";
import {
  FlexBox,
  FlexColumnBox,
} from "../components/global-components/FlexBox";
import Title from "../components/global-components/Title";
import useSx from "../hooks/useSx";
import useGetCategoryList from "../hooks/useGetCategoryList";
import useGetCategoryName from "../hooks/useGetCategoryName";

const BTN_CONVERSION = `단위
변환기`;
const BTN_MATH = `수학
`;
const BTN_SCIENCE = `과학
공학`;
const BTN_ECONOMY = `경제
사회`;
const BTN_DAILY = "일상";
const BTN_ETC = "기타";

/**
 * 계산기 전체 목록 페이지
 */
function CalculetList() {
  /**
   * 바로가기를 위한 ref
   */
  const conversion = useMoveScroll();
  const math = useMoveScroll();
  const science = useMoveScroll();
  const economy = useMoveScroll();
  const daily = useMoveScroll();
  const etc = useMoveScroll();
  const { getCategoryMainName } = useGetCategoryName(); // 카테고리 가져오기

  /**
   * 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
   */
  const [contentsShortcut, setContentsShortcut] = useState([]);
  // const contentsShortcut = [
  //   {
  //     text: BTN_CONVERSION,
  //     itemRef: conversion,
  //   },
  //   {
  //     text: BTN_MATH,
  //     itemRef: math,
  //   },
  //   {
  //     text: BTN_SCIENCE,
  //     itemRef: science,
  //   },
  //   {
  //     text: BTN_ECONOMY,
  //     itemRef: economy,
  //   },
  //   {
  //     text: BTN_DAILY,
  //     itemRef: daily,
  //   },
  //   {
  //     text: BTN_ETC,
  //     itemRef: etc,
  //   },
  // ];

  // calculet list
  const { calculetList } = useGetCategoryList();

  /**
   * 스크롤 위치
   */
  const [scrollPosition, setScrollPosition] = useState(0);
  /**
   * 스크롤 위치 변화에 따라 'scrollPosition' 변화
   */
  function updateScroll() {
    setScrollPosition(window.pageYOffset);
  }
  /**
   * 스크롤 위치 감지
   * 이벤트 등록 후, clean up 을 위해 return 에서 이벤트 제거
   */
  useEffect(() => {
    if (Object.keys(calculetList).length !== 0) {
      Object.keys(calculetList).map((data, index) => {
        // console.log(contentsShortcut);

        setContentsShortcut([
          ...contentsShortcut,
          {
            text: getCategoryMainName(data),
            itemRef: etc, // 임시
          },
        ]);
      });
      // Object.entries(calculetCategory).map(([key, value], index) => {
      //   if (key === "name") return;
      //   console.log(value);
      //   setContentsShortcut({
      //     text: value,
      //     itemRef: etc,
      //   });
      // });

      // for (const [key, value] of Object.entries(calculetCategory)) {
      //   if (key === "name") return;

      //   let content={text:value,   itemRef: daily}
      //   setContentsShortcut({

      //   })
      // }
      // Object.entries(calculetCategory).map((category, index) => {

      //   if(category==="name")
      //   // console.log(catetory);
      //   // setContentsShortcut({
      //   //   text: BTN_ETC,
      //   //   itemRef: etc,
      //   // });
      // });
    }

    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [calculetList]);

  /**
   * 스크롤 위치 Y 에 따른 활성화할 바로가기 버튼 (index로 접근)
   */
  const [isActive, setIsActive] = useState(0);

  // 바로가기 width
  const widthSx = "12rem";

  return (
    <>
      {Object.keys(calculetList).length !== 0 && (
        <Grid container sx={{ backgroundColor: "white" }}>
          <PageScreenBox sx={{ flexDirection: "row", mb: "16rem" }}>
            {/* 바로가기
            <FlexBox sx={{ width: widthSx }}>
              <FlexBox sx={{ position: "fixed" }}>
                {Object.keys(calculetList).length !== 0 && (
                  <Shortcut
                    contentsShortcut={contentsShortcut}
                    isActive={isActive}
                    setIsActive={setIsActive}
                  />
                )}
              </FlexBox>
            </FlexBox> */}
            {/* 계산기 전체 목록 */}
            <FlexColumnBox
              sx={{
                width: "100%",
                gap: "2.8rem",
              }}
            >
              <Grid container>
                <Title content="계산기 전체 목록" />
              </Grid>
              <Grid container>
                {Object.keys(calculetList).length !== 0 && (
                  <CalculetItemList
                    item={calculetList}
                    contentsShortcut={contentsShortcut}
                    setIsActive={setIsActive}
                    scrollPosition={scrollPosition}
                  />
                )}
              </Grid>
            </FlexColumnBox>
          </PageScreenBox>
        </Grid>
      )}
    </>
  );
}
export default CalculetList;
