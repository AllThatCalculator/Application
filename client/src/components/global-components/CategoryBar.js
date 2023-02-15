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
import useGetCategoryName from "../../hooks/useGetCategoryName";

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
  const { getCategoryMainName, getCategorySubName } = useGetCategoryName(); // 카테고리 가져오기
  const { WIDTH_CATEGORY_BAR } = useSx();
  const { calculetIdPage } = usePage();

  const gapSx = { gap: "0.8rem" };

  // calculetCategory 은 각 어떤 계산기를 갖고 있는 지에 대한 정보는 없기 때문에 기각!
  // toggle에서만 사용하기

  // < 카테고리 내용 >
  useEffect(() => {
    // toggle 상태를 useState 로 관리하기 위한 초기 toggle 세팅 (대분류와 소분류의 각 toggle 상태)
    // 01. 대분류
    const categoryToggleSet = [];
    for (let categoryMain of Object.values(contents)) {
      // 02. 소분류
      const subToggle = [];
      Object.values(categoryMain).map(() =>
        // 소분류 toggle 상태
        subToggle.push({ toggle: false })
      );
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
    // categoryMainId
    // categorySubId
    // contributor: {userName: 'test', profileImgSrc: '/file/profile/7cd77f0ab16f4ab1aa0747996ad46e81'}
    // description : "기타 계산기"
    // id : "9dc33a8f-7647-4598-ac0b-2d1089c89404"
    // title : "기타 계산기"
    // viewCnt : 219
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
   * @param {object} sub - 소분류 객체 [key, value]
   * @param {object} mainId - main id
   * @param {number} subIndex - 소분류 인덱스
   * @param {number} mainIndex - 대분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleSub(sub, mainId, subIndex, mainIndex, toggle) {
    const subId = Number(sub[0]); // sub id
    const subItems = sub[1]; // each sub's sub objects

    return (
      <div key={"sub-id" + subId}>
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
                <ListItemText primary={getCategorySubName(mainId, subId)} />
              </ListItemButton>
            </ListItem>
          )
        }
        {
          /* 계산기인 경우 */
          <Collapse in={toggle} timeout="auto" unmountOnExit>
            {Object.values(subItems).map(handleLeaf)}
          </Collapse>
        }
      </div>
    );
  }
  /**
   * 계산기를 대분류로 묶어서 반환하는 함수
   * @param {object} main - 대분류 객체 [key, value]
   * @param {number} mainIndex - 소분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleMain(main, mainIndex, toggle) {
    const mainId = Number(main[0]); // main id
    const mainItems = main[1]; // each main's sub objects

    return (
      <div key={"main-id" + mainId}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onToggleMain(mainIndex)}
            sx={{ ...gapSx }}
          >
            {toggle ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            <ListItemText primary={getCategoryMainName(mainId)} />
          </ListItemButton>
        </ListItem>
        <Collapse in={toggle} timeout="auto" unmountOnExit>
          {Object.entries(mainItems).map((sub, subIndex) =>
            handleSub(
              sub,
              mainId,
              subIndex,
              mainIndex,
              categoryToggle[mainIndex].subToggle[subIndex].toggle
            )
          )}
        </Collapse>
      </div>
    );
  }
  return (
    <SwipeableDrawer
      anchor="left"
      open={isActive}
      onClose={setIsActive(false)}
      onOpen={setIsActive(true)}
      PaperProps={{
        sx: { width: WIDTH_CATEGORY_BAR, maxWidth: "360px" },
      }}
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
        <Box sx={{ width: "100%" }}>
          {categoryToggle.length === Object.keys(contents).length &&
            Object.entries(contents).map((main, mainIndex) =>
              // [key, value] 형태로 map
              handleMain(main, mainIndex, categoryToggle[mainIndex].toggle)
            )}
        </Box>
      </StyledScrollbar>
    </SwipeableDrawer>
  );
}

export default CategoryBar;
