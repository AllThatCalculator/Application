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
  const { isWindowSmDown } = useSx();
  /**
   * 바로가기를 위한 ref
   */
  const conversion = useMoveScroll();
  const math = useMoveScroll();
  const science = useMoveScroll();
  const economy = useMoveScroll();
  const daily = useMoveScroll();
  const etc = useMoveScroll();

  // 반응형 아이콘 크기
  const fontSize = isWindowSmDown ? "medium" : "large";
  /**
   * 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
   */
  const contentsShortcut = [
    {
      text: BTN_CONVERSION,
      icon: <ImportExportIcon fontSize={fontSize} />,
      itemRef: conversion,
    },
    {
      text: BTN_MATH,
      icon: <IsoIcon fontSize={fontSize} />,
      itemRef: math,
    },
    {
      text: BTN_SCIENCE,
      icon: <LightbulbOutlinedIcon fontSize={fontSize} />,
      itemRef: science,
    },
    {
      text: BTN_ECONOMY,
      icon: <PeopleAltIcon fontSize={fontSize} />,
      itemRef: economy,
    },
    {
      text: BTN_DAILY,
      icon: <TodayIcon fontSize={fontSize} />,
      itemRef: daily,
    },
    {
      text: BTN_ETC,
      icon: <MoreHorizIcon fontSize={fontSize} />,
      itemRef: etc,
    },
  ];

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
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  /**
   * 스크롤 위치 Y 에 따른 활성화할 바로가기 버튼 (index로 접근)
   */
  const [isActive, setIsActive] = useState(0);

  // 바로가기 width
  const widthSx = "12rem";

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <PageScreenBox sx={{ flexDirection: "row", mb: "16rem" }}>
        {/* 바로가기 */}
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
        </FlexBox>
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
  );
}
export default CalculetList;
