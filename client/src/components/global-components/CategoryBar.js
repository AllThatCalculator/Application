import {
  Box,
  Collapse,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import StyledScrollbar from "../atom-components/StyledScrollbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";
import useSx from "../../hooks/useSx";
import usePage from "../../hooks/usePage";

/**
 * 카테고리 바 구현
 *
 * @param {object, boolean} param0
 *
 * contents : <배열> 카테고리 바에 들어갈 내용
 * -> categoryMain : 대분류
 * -> categorySub : <배열> 소분류, 계산기들
 *    -> name: 소분류 이름, calculets: 계산기들
 * isActive : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
 * setIsActive : isActive 관리 함수
 */
function CategoryBar({ contents, isActive, setIsActive }) {
  const { WIDTH_CATEGORY_BAR } = useSx();
  const { calculetIdPage } = usePage();
  // console.log(contents);
  const gapSx = { gap: "0.8rem" };

  // < 카테고리 내용 >
  useEffect(() => {
    // 대분류 개수
    const categoryMainLength = contents.length;
    // toggle 상태를 useState 로 관리하기 위한 초기 toggle 세팅 (대분류와 소분류의 각 toggle 상태)
    const categoryToggleSet = [];
    for (let i = 0; i < categoryMainLength; i++) {
      // 소분류 개수
      const categorySubLength = contents[i].sub.length;
      const subToggle = [];
      for (let j = 0; j < categorySubLength; j++) {
        // 소분류 toggle 상태
        subToggle.push({ toggle: false });
      }
      // 대분류 toggle + 소분류 toggle
      categoryToggleSet.push({ toggle: false, subToggle });
    }
    setCategoryToggle(categoryToggleSet);
  }, [contents]);

  const [categoryToggle, setCategoryToggle] = useState([]);
  // 대분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleMain(mainIndex) {
    const newCategoryToggle = [...categoryToggle];
    newCategoryToggle[mainIndex].toggle = !categoryToggle[mainIndex].toggle;
    setCategoryToggle(newCategoryToggle);
  }
  // 소분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleSub(mainIndex, subIndex) {
    const newCategoryToggle = [...categoryToggle];
    newCategoryToggle[mainIndex].subToggle[subIndex].toggle =
      !categoryToggle[mainIndex].subToggle[subIndex].toggle;
    setCategoryToggle(newCategoryToggle);
  }
  /**
   * 계산기 바로가기 생성하는 함수
   * @param {object} calculet 계산기 id, title 포함하는 객체
   */
  function handleLeaf(calculet) {
    return (
      <ListItem
        key={calculet.id}
        disablePadding
        // - 현재 페이지에 해당되는 계산기라면 focus (Redux 도입 후에 구현될 예정)
        // sx={{ backgroundColor: calculetId === calculet.id && "#000000" }}
      >
        <ListItemButton
          onClick={(e) => {
            calculetIdPage(calculet.id);
            setIsActive(false)(e);
          }}
          sx={{ ...gapSx, pl: (theme) => theme.spacing(10) }}
        >
          <ListItemText primary={calculet.title} />
        </ListItemButton>
      </ListItem>
    );
  }

  /**
   * 계산기를 소분류로 묶어서 반환하는 함수
   * @param {object} sub - 소분류 객체
   * @param {number} subIndex - 소분류 인덱스
   * @param {number} mainIndex - 대분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleSub(sub, subIndex, mainIndex, toggle) {
    return (
      <div key={sub.categorySub}>
        {
          /* 카테고리가 더 있는 경우 */
          sub.categorySub !== null && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onToggleSub(mainIndex, subIndex)}
                sx={{ ...gapSx, pl: (theme) => theme.spacing(5.5) }}
              >
                {toggle ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )}
                <ListItemText primary={sub.categorySub} />
              </ListItemButton>
            </ListItem>
          )
        }
        {
          /* 계산기인 경우 */
          <Collapse in={toggle} timeout="auto" unmountOnExit>
            {sub.subItems.map(handleLeaf)}
          </Collapse>
        }
      </div>
    );
  }
  /**
   * 계산기를 대분류로 묶어서 반환하는 함수
   * @param {object} main - 대분류 객체
   * @param {number} mainIndex - 소분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleMain(main, mainIndex, toggle) {
    return (
      <div key={main.categoryMain}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onToggleMain(mainIndex)}
            sx={{ ...gapSx }}
          >
            {toggle ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            <ListItemText primary={main.categoryMain} />
          </ListItemButton>
        </ListItem>
        <Collapse in={toggle} timeout="auto" unmountOnExit>
          {main.mainItems.map((sub, subIndex) =>
            handleSub(
              sub,
              subIndex,
              mainIndex,
              categoryToggle[mainIndex].subToggle[subIndex].toggle
            )
          )}
        </Collapse>
      </div>
    );
  }
  // console.log(categoryToggle);
  return (
    <SwipeableDrawer
      anchor="left"
      open={isActive}
      onClose={setIsActive(false)}
      onOpen={setIsActive(true)}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={setIsActive(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {/* 카테고리바 리스트 */}
      <StyledScrollbar>
        <Box sx={{ width: WIDTH_CATEGORY_BAR }}>
          {categoryToggle.length !== 0 &&
            // contents.map((main, mainIndex) =>
            //   handleMain(main, mainIndex, categoryToggle[mainIndex].toggle)
            // )
            Object.keys(contents).map((main, mainIndex) => {
              // handleMain(main, mainIndex, categoryToggle[mainIndex].toggle)
              console.log(main);
            })}
        </Box>
      </StyledScrollbar>
    </SwipeableDrawer>
  );
}

export default CategoryBar;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled, { css, keyframes } from "styled-components";
// import { BtnTrans, BtnTransToggle } from "../atom-components/ButtonTemplate";
// import StyledScrollbar from "../atom-components/StyledScrollbar";
// import {
//   DESKTOP,
//   FlexColumnLayout,
//   FlexRowLayout,
//   PHONE,
//   TABLET,
// } from "../Layout";
// import URL from "../PageUrls";
// import styles from "../styles";
// /**
//  * 스타일드 애니메이션
//  */
// const slideIn = keyframes`
//   from {
//     margin-left: -100%;
//   }
//   to {
//     margin-left: 0;
//   }
// `;
// const slideInOut = keyframes`
//   from {
//     margin-left: 0;
//   }
//   to {
//     margin-left: -100%;
//   }
// `;
// /**
//  * 카테고리바 위치 고정 & 반응형 너비
//  */
// const Positioner = styled(FlexRowLayout)`
//   position: fixed;
//   top: 60px;
//   height: calc(100% - 60px);

//   @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
//     ${styles.styleSize.categoryPhone};
//   }
//   @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
//     ${styles.styleSize.categoryTablet};
//   }
//   @media screen and (min-width: ${DESKTOP}) {
//     ${styles.styleSize.categoryDesktop};
//   }

//   background: ${styles.styleColor.white300};
//   padding: ${styles.styleLayout.basic300} ${styles.styleLayout.basic700};

//   z-index: 101;
//   ${styles.styleEffect.opacity100};
//   animation: ${(props) =>
//     props.isActive === true
//       ? css`
//           ${slideIn}
//         `
//       : css`
//           ${slideInOut}
//         `};
//   animation-duration: 0.4s;
//   animation-fill-mode: forwards;
// `;

// /**
//  * 카테고리바 내의 계산기들과 스크롤바 묶은 box 스타일 정의
//  */
// const ScrollbarBox = styled(StyledScrollbar)`
//   padding-right: ${styles.styleLayout.basic700};
// `;
// /**
//  * 카테고리바 내의 계산기들 묶은 box 스타일 정의
//  */
// const StyledCategoryBox = styled(FlexColumnLayout)`
//   width: 100%;
// `;
// /**
//  * indent만큼 들여쓰기
//  */
// const StyledIndent = styled.div`
//   margin-left: ${(props) => props.indent}em;
// `;
// /**
//  * 카테고리 바 구현
//  *
//  * @param {object, boolean} param0
//  *
//  * contents : <배열> 카테고리 바에 들어갈 내용
//  * -> categoryMain : 대분류
//  * -> categorySub : <배열> 소분류, 계산기들
//  *    -> name: 소분류 이름, calculets: 계산기들
//  * isActive : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
//  * setIsActive : isActive 관리 함수
//  */
// function CategoryBar({ contents, isActive, setIsActive }) {
//   const navigate = useNavigate();
//   // < 카테고리 내용 >
//   // 대분류 개수
//   const categoryMainLength = contents.length;
//   // toggle 상태를 useState 로 관리하기 위한 초기 toggle 세팅 (대분류와 소분류의 각 toggle 상태)
//   const categoryToggleSet = [];
//   for (let i = 0; i < categoryMainLength; i++) {
//     // 소분류 개수
//     const categorySubLength = contents[i].mainItems.length;
//     const subToggle = [];
//     for (let j = 0; j < categorySubLength; j++) {
//       // 소분류 toggle 상태
//       subToggle.push({ toggle: false });
//     }
//     // 대분류 toggle + 소분류 toggle
//     categoryToggleSet.push({ toggle: false, subToggle });
//   }
//   const [categoryToggle, setCategoryToggle] = useState(categoryToggleSet);
//   // 대분류 toggle 값을 반전시키는 버튼 이벤트 함수
//   function onToggleMain(mainIndex) {
//     const newCategoryToggle = [...categoryToggle];
//     newCategoryToggle[mainIndex].toggle = !categoryToggle[mainIndex].toggle;
//     setCategoryToggle(newCategoryToggle);
//   }
//   // 소분류 toggle 값을 반전시키는 버튼 이벤트 함수
//   function onToggleSub(mainIndex, subIndex) {
//     const newCategoryToggle = [...categoryToggle];
//     newCategoryToggle[mainIndex].subToggle[subIndex].toggle =
//       !categoryToggle[mainIndex].subToggle[subIndex].toggle;
//     setCategoryToggle(newCategoryToggle);
//   }
//   /**
//    * 계산기 바로가기 생성하는 함수
//    * @param {object} calculet 계산기 id, title 포함하는 객체
//    */
//   function handleLeaf(calculet) {
//     return (
//       <BtnTrans
//         key={calculet.id}
//         text={"• " + calculet.title}
//         isCenter={false}
//         onClick={() => {
//           navigate(URL.CALCULET + calculet.id);
//           setIsActive(false);
//         }}
//       />
//     );
//   }
//   /**
//    * 계산기를 소분류로 묶어서 반환하는 함수
//    * @param {object} sub - 소분류 객체
//    * @param {number} subIndex - 소분류 인덱스
//    * @param {number} mainIndex - 대분류 인덱스
//    * @param {boolean} toggle - 열려있는지 여부
//    */
//   function handleSub(sub, subIndex, mainIndex, toggle) {
//     return (
//       <div key={sub.categorySub}>
//         {sub.categorySub !== null && (
//           <BtnTransToggle
//             text={sub.categorySub}
//             isToggle={toggle}
//             isCenter={false}
//             onClick={() => onToggleSub(mainIndex, subIndex)}
//           />
//         )}
//         {toggle && (
//           <StyledIndent indent={1.5}>
//             {sub.subItems.map(handleLeaf)}
//           </StyledIndent>
//         )}
//       </div>
//     );
//   }
//   /**
//    * 계산기를 대분류로 묶어서 반환하는 함수
//    * @param {object} main - 대분류 객체
//    * @param {number} mainIndex - 소분류 인덱스
//    * @param {boolean} toggle - 열려있는지 여부
//    */
//   function handleMain(main, mainIndex, toggle) {
//     return (
//       <div key={main.categoryMain}>
//         <BtnTransToggle
//           text={main.categoryMain}
//           isToggle={toggle}
//           isCenter={false}
//           onClick={() => onToggleMain(mainIndex)}
//         />
//         {toggle && (
//           <StyledIndent indent={1.5}>
//             {main.mainItems.map((sub, subIndex) =>
//               handleSub(
//                 sub,
//                 subIndex,
//                 mainIndex,
//                 categoryToggle[mainIndex].subToggle[subIndex].toggle
//               )
//             )}
//           </StyledIndent>
//         )}
//       </div>
//     );
//   }
//   return (
//     <Positioner isActive={isActive}>
//       <ScrollbarBox>
//         <StyledCategoryBox gap="3px">
//           {contents.map((main, mainIndex) =>
//             handleMain(main, mainIndex, categoryToggle[mainIndex].toggle)
//           )}
//         </StyledCategoryBox>
//       </ScrollbarBox>
//     </Positioner>
//   );
// }

// export default CategoryBar;
