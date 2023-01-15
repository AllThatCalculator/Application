import styled from "styled-components";
import {
  ContentLayout,
  DESKTOP,
  FlexColumnLayout,
  PHONE,
  TABLET,
  White300Layout,
} from "../components/Layout";
import styles from "../components/styles";
import BigTitle from "../components/atom-components/BigTitle";
import CalculetItemList from "../components/calculet-list/CalculetItemList";
import Shortcut from "../components/calculet-list/Shortcut";
import useMoveScroll from "../hooks/useMoveScroll";
import { useEffect } from "react";
import { useState } from "react";
import calculetsUser from "../user-actions/calculetsUser";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import IsoIcon from "@mui/icons-material/Iso";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TodayIcon from "@mui/icons-material/Today";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grid } from "@mui/material";
import PageScreenBox from "../components/global-components/PageScreenBox";
import {
  FlexBox,
  FlexColumnBox,
} from "../components/global-components/FlexBox";
import Title from "../components/global-components/Title";

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
 * 흰색 뒷 배경
 */
const StyledWhite300 = styled(White300Layout)`
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: -1;
`;
/**
 * ContentLayout을 상속하는 CalculetListLayout
 * - flex와 gap, padding 설정을 새로 함
 */
const CalculetListLayout = styled(ContentLayout)`
  display: flex;
  gap: ${styles.styleLayout.basic300};
  padding: ${styles.styleLayout.basic350};
`;
/**
 * 바로가기 너비
 * 계산기 전체 목록 너비
 */
const Wrapper = styled(FlexColumnLayout)`
  @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
    width: ${(props) => props.phone};
  }
  @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
    width: ${(props) => props.tablet};
  }
  @media screen and (min-width: ${DESKTOP}) {
    width: ${(props) => props.desktop};
  }
`;
/**
 * 바로가기 고정
 */
const WrapperFix = styled(FlexColumnLayout)`
  position: fixed;
`;

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

  /**
   * 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
   */
  const contentsShortcut = [
    {
      text: BTN_CONVERSION,
      icon: <ImportExportIcon fontSize="large" />,
      itemRef: conversion,
      degree: 180,
    },
    {
      text: BTN_MATH,
      icon: <IsoIcon fontSize="large" />,
      itemRef: math,
    },
    {
      text: BTN_SCIENCE,
      icon: <LightbulbOutlinedIcon fontSize="large" />,
      itemRef: science,
    },
    {
      text: BTN_ECONOMY,
      icon: <PeopleAltIcon fontSize="large" />,
      itemRef: economy,
    },
    {
      text: BTN_DAILY,
      icon: <TodayIcon fontSize="large" />,
      itemRef: daily,
    },
    {
      text: BTN_ETC,
      icon: <MoreHorizIcon fontSize="large" />,
      itemRef: etc,
    },
  ];

  /**
   * 계산기 전체 목록 정보 (대분류, 소분류에 따른 계산기) 서버에서 불러오기
   * 페이지 렌더시 한 번만
   */
  const [contentsCalculetList, setContentsCalculetList] = useState(null);
  useEffect(() => {
    calculetsUser().then((res) => {
      // 전체 목록 정보 불러오기 성공
      if (res.success) setContentsCalculetList(res.calculetLists);
    });
  }, []);

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
    <>
      <Grid container sx={{ backgroundColor: "white" }}>
        <PageScreenBox sx={{ flexDirection: "row" }}>
          <FlexBox sx={{ width: widthSx }}>
            <FlexBox sx={{ position: "fixed" }}>
              <Shortcut
                contentsShortcut={contentsShortcut}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            </FlexBox>
          </FlexBox>

          <FlexColumnBox
            sx={{
              width: "100%",
              gap: { xs: "0.4rem", sm: "0.8rem", md: "1.2rem" },
            }}
          >
            <Grid container>
              <Title content="계산기 전체 목록" />
            </Grid>
            <Grid container>
              {contentsCalculetList && (
                <CalculetItemList
                  item={contentsCalculetList}
                  contentsShortcut={contentsShortcut}
                  setIsActive={setIsActive}
                  scrollPosition={scrollPosition}
                />
              )}
            </Grid>
          </FlexColumnBox>
        </PageScreenBox>
      </Grid>
      {/* <StyledWhite300 />
      <CalculetListLayout>
        <Wrapper phone="56px" tablet="78px" desktop="72px">
          <WrapperFix>
            <Shortcut
              contentsShortcut={contentsShortcut}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          </WrapperFix>
        </Wrapper>
        <Wrapper phone="284px" tablet="669px" desktop="988px" gap="28px">
          <BigTitle content="계산기 전체 목록" />
          {contentsCalculetList && (
            <CalculetItemList
              item={contentsCalculetList}
              contentsShortcut={contentsShortcut}
              setIsActive={setIsActive}
              scrollPosition={scrollPosition}
            />
          )}
        </Wrapper>
      </CalculetListLayout> */}
    </>
  );
}
export default CalculetList;

// import styled from "styled-components";
// import {
//   ContentLayout,
//   DESKTOP,
//   FlexColumnLayout,
//   PHONE,
//   TABLET,
//   White300Layout,
// } from "../components/Layout";
// import styles from "../components/styles";
// import BigTitle from "../components/atom-components/BigTitle";
// import CalculetItemList from "../components/calculet-list/CalculetItemList";
// import Shortcut from "../components/calculet-list/Shortcut";
// import useMoveScroll from "../hooks/useMoveScroll";
// import { useEffect } from "react";
// import { useState } from "react";
// import calculetsUser from "../user-actions/calculetsUser";

// const BTN_CONVERSION = `단위
// 변환기`;
// const BTN_MATH = "수학";
// const BTN_SCIENCE = `과학
// 공학`;
// const BTN_ECONOMY = `경제
// 사회`;
// const BTN_DAILY = "일상";
// const BTN_ETC = "기타";

// /**
//  * 흰색 뒷 배경
//  */
// const StyledWhite300 = styled(White300Layout)`
//   position: fixed;
//   top: 60px;
//   bottom: 0;
//   z-index: -1;
// `;
// /**
//  * ContentLayout을 상속하는 CalculetListLayout
//  * - flex와 gap, padding 설정을 새로 함
//  */
// const CalculetListLayout = styled(ContentLayout)`
//   display: flex;
//   gap: ${styles.styleLayout.basic300};
//   padding: ${styles.styleLayout.basic350};
// `;
// /**
//  * 바로가기 너비
//  * 계산기 전체 목록 너비
//  */
// const Wrapper = styled(FlexColumnLayout)`
//   @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
//     width: ${(props) => props.phone};
//   }
//   @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
//     width: ${(props) => props.tablet};
//   }
//   @media screen and (min-width: ${DESKTOP}) {
//     width: ${(props) => props.desktop};
//   }
// `;
// /**
//  * 바로가기 고정
//  */
// const WrapperFix = styled(FlexColumnLayout)`
//   position: fixed;
// `;

// /**
//  * 계산기 전체 목록 페이지
//  */
// function CalculetList() {
//   /**
//    * 바로가기를 위한 ref
//    */
//   const conversion = useMoveScroll();
//   const math = useMoveScroll();
//   const science = useMoveScroll();
//   const economy = useMoveScroll();
//   const daily = useMoveScroll();
//   const etc = useMoveScroll();

//   /**
//    * 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
//    */
//   const contentsShortcut = [
//     {
//       text: BTN_CONVERSION,
//       icon: "ArrowDownUp",
//       itemRef: conversion,
//       degree: 180,
//     },
//     {
//       text: BTN_MATH,
//       icon: "PlusSlashMinus",
//       itemRef: math,
//     },
//     {
//       text: BTN_SCIENCE,
//       icon: "Lightbulb",
//       itemRef: science,
//     },
//     {
//       text: BTN_ECONOMY,
//       icon: "People",
//       itemRef: economy,
//     },
//     {
//       text: BTN_DAILY,
//       icon: "CalendarWeek",
//       itemRef: daily,
//     },
//     {
//       text: BTN_ETC,
//       icon: "ThreeDots",
//       itemRef: etc,
//     },
//   ];

//   /**
//    * 계산기 전체 목록 정보 (대분류, 소분류에 따른 계산기) 서버에서 불러오기
//    * 페이지 렌더시 한 번만
//    */
//   const [contentsCalculetList, setContentsCalculetList] = useState(null);
//   useEffect(() => {
//     calculetsUser().then((res) => {
//       // 전체 목록 정보 불러오기 성공
//       if (res.success) setContentsCalculetList(res.calculetLists);
//     });
//   }, []);

//   /**
//    * 스크롤 위치
//    */
//   const [scrollPosition, setScrollPosition] = useState(0);
//   /**
//    * 스크롤 위치 변화에 따라 'scrollPosition' 변화
//    */
//   function updateScroll() {
//     setScrollPosition(window.pageYOffset);
//   }
//   /**
//    * 스크롤 위치 감지
//    * 이벤트 등록 후, clean up 을 위해 return 에서 이벤트 제거
//    */
//   useEffect(() => {
//     window.addEventListener("scroll", updateScroll);
//     return () => {
//       window.removeEventListener("scroll", updateScroll);
//     };
//   }, []);

//   /**
//    * 스크롤 위치 Y 에 따른 활성화할 바로가기 버튼 (index로 접근)
//    */
//   const [isActive, setIsActive] = useState(0);

//   return (
//     <>
//       <StyledWhite300 />
//       <CalculetListLayout>
//         <Wrapper phone="56px" tablet="78px" desktop="72px">
//           <WrapperFix>
//             <Shortcut
//               contentsShortcut={contentsShortcut}
//               isActive={isActive}
//               setIsActive={setIsActive}
//             />
//           </WrapperFix>
//         </Wrapper>
//         <Wrapper phone="284px" tablet="669px" desktop="988px" gap="28px">
//           <BigTitle content="계산기 전체 목록" />
//           {contentsCalculetList && (
//             <CalculetItemList
//               item={contentsCalculetList}
//               contentsShortcut={contentsShortcut}
//               setIsActive={setIsActive}
//               scrollPosition={scrollPosition}
//             />
//           )}
//         </Wrapper>
//       </CalculetListLayout>
//     </>
//   );
// }
// export default CalculetList;
