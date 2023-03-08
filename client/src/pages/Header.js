import LogoHeader from "../components/atom-components/LogoHeader";
import BoxSearchInput from "../components/atom-components/BoxSearchInput";
import CategoryBar from "../components/global-components/CategoryBar";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import URL from "../components/PageUrls";
import firebaseAuth from "../firebaseAuth";
import {
  AppBar,
  Avatar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  InvertButton,
  InvertTextButton,
} from "../components/atom-components/Buttons";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PopupList from "../components/global-components/PopupList";
import useSx from "../hooks/useSx";

import SearchIcon from "@mui/icons-material/Search";
import { forwardRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import usePage from "../hooks/usePage";
import { useDispatch, useSelector } from "react-redux";
import getCalculetList from "../user-actions/getCalculetList";
import {
  onSetCalculetConverters,
  onSetCalculetList,
} from "../modules/calculetList";
import useGetCategoryList from "../hooks/useGetCategoryList";
import getCalculetConverters from "../user-actions/getCalculetConverters";

/**
 * 헤더에 있는 컴포넌트들
 * -> 카테고리바, 로고, 검색창, 로그인/아웃 버튼
 * @param {function} onIsOpen 버튼 이벤트 (카테고리바 버튼 이벤트)
 * @param {function} onLogout 로그아웃 이벤트 (로그아웃 버튼 이벤트)
 */
function Contents({ isLoggedIn, onIsOpen, onLogout }) {
  const { isWindowMdDown } = useSx();
  const { loginPage, signUpPage } = usePage();

  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));
  // 내 계정 팝업 리스트
  const myAccountList = [
    // [
    //   {
    //     name: "프로필",
    //     icon: <AccountCircleOutlinedIcon />,
    //     onClickFuntion: profilePage,
    //   },
    //   {
    //     name: "설정",
    //     icon: <SettingsOutlinedIcon />,
    //     onClickFuntion: settingAccountPage,
    //   },
    // ],
    [
      {
        name: "로그아웃",
        icon: <LogoutOutlinedIcon />,
        onClickFuntion: onLogout,
      },
    ],
  ];

  // 내 계정 리스트 item 컴포넌트
  const userInfoComponent = (
    <Box
      sx={{ display: "flex", gap: "1rem", p: "1.6rem", alignItems: "center" }}
    >
      <Avatar src={isLoggedIn ? userInfo.profileImgSrc : ""} />
      <Typography variant="body1">{isLoggedIn && userInfo.userName}</Typography>
    </Box>
  );

  const sizeSx = { fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" } };
  const buttonSizeSx = {
    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.4rem" },
  };
  const avatarSizeSx = { xs: "2.8rem", sm: "3.6rem", md: "4rem" };

  const HeaderPopupLists = [
    // // 저작
    // {
    //   isMd: true,
    //   popupIcon: <EditIcon />,
    //   popupTitle: "저작",
    //   popupListData: writeList,
    //   popupContent: null,
    // },
    // // 내 이력
    // {
    //   isMd: isWindowMdDown,
    //   popupIcon: <FolderIcon />,
    //   popupTitle: "내 이력",
    //   popupListData: myHistoryList,
    //   popupContent: null,
    // },
    // 내 계정
    {
      isMd: true,
      popupIcon: (
        <Avatar
          src={isLoggedIn ? userInfo.profileImgSrc : ""}
          sx={{ width: avatarSizeSx, height: avatarSizeSx }}
        />
      ),
      popupTitle: "내 계정",
      popupListData: myAccountList,
      popupContent: userInfoComponent,
    },
  ];

  // sm down : 검색창 (Full-Screen)
  const [isSearch, setIsSearch] = useState(false);
  function handleIsSearchOpen() {
    setIsSearch(true);
  }
  function handleIsSearchClose() {
    setIsSearch(false);
  }
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  function SearchScreen() {
    return (
      <Dialog
        fullScreen
        open={isSearch}
        onClose={handleIsSearchClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ width: "100%" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleIsSearchClose}
            >
              <ArrowBackIcon />
            </IconButton>
            <BoxSearchInput />
          </Toolbar>
        </AppBar>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: "2.4rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{ ...sizeSx }}
          edge="start"
          color="inherit"
          onClick={onIsOpen}
        >
          <MenuIcon fontSize="inherit" />
        </IconButton>
        <LogoHeader />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: "0.4rem", sm: "1.8rem", md: "2.4rem" },
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {
          // 로그인, 회원가입 제외하고 팝업 렌더
          window.location.pathname.includes(URL.LOGIN) ||
          window.location.pathname.includes(URL.SIGN_UP) ? (
            <></>
          ) : (
            <>
              {isWindowMdDown ? (
                <>
                  <IconButton sx={{ ...sizeSx }} onClick={handleIsSearchOpen}>
                    <SearchIcon
                      sx={{ color: "white", ...sizeSx }}
                      fontSize="inherit"
                    />
                  </IconButton>
                  <SearchScreen />
                </>
              ) : (
                <BoxSearchInput />
              )}
              {
                /* 로그인 상태 ? 프로필 : 로그인 버튼 */
                isLoggedIn ? (
                  HeaderPopupLists.map(
                    (popupData, index) =>
                      popupData.isMd && (
                        <PopupList
                          key={index}
                          popupIcon={popupData.popupIcon}
                          popupTitle={popupData.popupTitle}
                          popupListData={popupData.popupListData}
                          popupContent={popupData.popupContent}
                        />
                      )
                  )
                ) : (
                  // 로그인 | 회원가입 버튼
                  <>
                    <InvertTextButton
                      sx={{ ...buttonSizeSx, mr: "0.4rem" }}
                      onClick={loginPage}
                    >
                      로그인
                    </InvertTextButton>
                    <InvertButton
                      sx={{ ...buttonSizeSx }}
                      variant="contained"
                      onClick={signUpPage}
                    >
                      회원가입
                    </InvertButton>
                  </>
                )
              }
            </>
          )
        }
      </Box>
    </Box>
  );
}

async function getAllCalculetList(setLoading) {
  await setLoading(false);

  let result = { calculetList: null, calculetConverters: null };
  await getCalculetList().then((data) => {
    /** set category list */
    result.calculetList = data;
    // dispatch(onSetCalculetList(data));
  });
  await getCalculetConverters().then((data) => {
    /** set category converter */
    result.calculetConverters = data;

    // dispatch(onSetCalculetConverters(data));
  });
  await setLoading(true);

  return result;
}

/**
 * 헤더
 * -> 스크롤 내리면 색 바뀜
 * -> 계산기 카테고리, 로고, 검색창, 로그인 버튼
 *
 */
function Header({ isLoggedIn }) {
  /** Redux State */
  const dispatch = useDispatch();
  // calculet list
  const { calculetList } = useGetCategoryList();

  /**
   * 카테고리바 영역을 ref로 지정
   * categoryBarRef
   * -> elementRef : 카테고리 바 영역 ref
   * -> isActive : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
   * -> setIsActive : 카테고리바 활성화 관리 함수
   */
  const [categoryState, setCategoryState] = useState(false);
  const setIsActive = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCategoryState(open);
  };

  /**
   * 카테고리바 정보 (대분류, 소분류에 따른 계산기) 서버에서 불러오기
   * 페이지 렌더시 한 번만
   */
  const [loading, setLoading] = useState(false);

  const onGetAllCalculetList = useCallback(() => {
    getAllCalculetList(setLoading).then((result) => {
      dispatch(onSetCalculetList(result.calculetList));
      dispatch(onSetCalculetConverters(result.calculetConverters));
    });
  }, [dispatch]);

  useEffect(() => {
    onGetAllCalculetList();
  }, [onGetAllCalculetList]);

  /**
   * 로그아웃
   */
  function onHandlerLogout(event) {
    const request = firebaseAuth.signOutAuth();
    request.then((result) => {
      if (result === true) {
        // 로그아웃 성공하면 새로고침
        window.location.reload();
      }
    });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ width: "100%" }}>
          <Toolbar sx={{ width: "100%" }}>
            <Contents
              isLoggedIn={isLoggedIn}
              onIsOpen={setIsActive(true)}
              onLogout={onHandlerLogout}
            />
          </Toolbar>
        </AppBar>
      </Box>
      {Object.keys(calculetList).length !== 0 && loading && (
        <CategoryBar
          contents={calculetList}
          isActive={categoryState}
          setIsActive={setIsActive}
        />
      )}
    </>
  );
}

export default Header;

// import styled from "styled-components";
// import LogoHeader from "../components/atom-components/LogoHeader";
// import BoxSearchInput from "../components/atom-components/BoxSearchInput";
// import styles from "../components/styles.js";
// import { BtnMiddleIcon } from "../components/atom-components/ButtonIcon.js";
// import { BtnWhite } from "../components/atom-components/ButtonTemplate";
// import CategoryBar from "../components/global-components/CategoryBar";
// import { useCallback, useState } from "react";
// import { useEffect } from "react";
// import { FlexRowLayout } from "../components/Layout";
// import URL from "../components/PageUrls";

// import calculetsUser from "../user-actions/calculetsUser";
// import useClickOutside from "../hooks/useClickOutside";

// import firebaseAuth from "../firebaseAuth";

// /**
//  * header와 categoryBar 박스를 감싸는 스타일 정의
//  */
// const Wrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;
// // 상단 고정
// const Positioner = styled.div`
//   position: fixed;
//   top: 0px;
//   width: 100%;
//   height: 60px;
//   padding: ${styles.styleLayout.basic600};
//   z-index: 100;
//   background: ${(props) => props.isChange && `${styles.styleColor.blue100}`};
// `;
// // 내용 정렬
// const WhiteBackground = styled(FlexRowLayout)`
//   justify-content: space-between;
//   gap: ${styles.styleLayout.basic700};
// `;
// const HeaderContents = styled(FlexRowLayout)`
//   align-items: center;
//   gap: ${styles.styleLayout.basic700};
// `;
// /**
//  * 헤더에 있는 컴포넌트들
//  * -> 카테고리바, 로고, 검색창, 로그인/아웃 버튼
//  * @param {function} onIsOpen 버튼 이벤트 (카테고리바 버튼 이벤트)
//  * @param {function} onLogin 로그인 페이지로 이동 이벤트 (로그인 버튼 이벤트)
//  * @param {function} onLogout 로그아웃 이벤트 (로그아웃 버튼 이벤트)
//  */
// function Contents({ isLoggedIn, onIsOpen, onLogin, onLogout }) {
//   /**
//    * 페이지 새로고침 되자마자 로그인 상태 확인하여 로그인/아웃 버튼 렌더
//    */
//   const [logBtn, setLogBtn] = useState(null);

//   const onHandlerLogin = useCallback(() => {
//     if (isLoggedIn) {
//       setLogBtn(<BtnWhite text="로그아웃" onClick={onLogout} />);
//     } else {
//       setLogBtn(<BtnWhite text="로그인" icon="Person" onClick={onLogin} />);
//     }
//   }, [isLoggedIn, onLogin, onLogout]);

//   useEffect(onHandlerLogin, [onHandlerLogin]);

//   return (
//     <WhiteBackground>
//       <HeaderContents>
//         <BtnMiddleIcon
//           text="메뉴"
//           icon="List"
//           color="white"
//           onClick={onIsOpen}
//         />
//         <LogoHeader />
//       </HeaderContents>
//       <HeaderContents>
//         <BoxSearchInput text="계산하고 싶은 것을 검색하세요." />
//         {logBtn}
//       </HeaderContents>
//     </WhiteBackground>
//   );
// }

// /**
//  * 헤더
//  * -> 스크롤 내리면 색 바뀜
//  * -> 계산기 카테고리, 로고, 검색창, 로그인 버튼
//  *
//  */
// function Header({ isLoggedIn }) {
//   /**
//    * 카테고리바 영역을 ref로 지정
//    * categoryBarRef
//    * -> elementRef : 카테고리 바 영역 ref
//    * -> isActive : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
//    * -> setIsActive : 카테고리바 활성화 관리 함수
//    */
//   const categoryBarRef = useClickOutside();
//   /**
//    * 카테고리바 정보 (대분류, 소분류에 따른 계산기) 서버에서 불러오기
//    * 페이지 렌더시 한 번만
//    */
//   const [contentsCategory, setContentsCategory] = useState(null);
//   const onHandlerSetContentsCategory = useCallback(() => {
//     calculetsUser().then((res) => {
//       // 카테고리바 정보 불러오기 성공
//       if (res.success) setContentsCategory(res.calculetLists);
//     });
//   }, []);
//   useEffect(() => {
//     onHandlerSetContentsCategory();
//   }, [onHandlerSetContentsCategory]);

//   /**
//    * 스크롤의 위치
//    */
//   const [scrollPosition, setScrollPosition] = useState(0);
//   /**
//    * header의 색 변화 상태
//    */
//   const [isChange, setIsChange] = useState(false);
//   /**
//    * 스크롤 위치 변화에 따라 'scrollPosition' 변화와 'isChange' 변화
//    */
//   const updateScroll = useCallback(() => {
//     setScrollPosition(window.pageYOffset);
//     if (scrollPosition < 10) setIsChange(false);
//     else setIsChange(true);
//   }, [scrollPosition]);
//   /**
//    * 스크롤 위치 변화 감지
//    */
//   useEffect(() => {
//     window.addEventListener("scroll", updateScroll);
//     return () => {
//       window.removeEventListener("scroll", updateScroll);
//     };
//   }, [updateScroll]);
//   /**
//    * 로그인 페이지로 이동 이벤트
//    */
//   function onHandlerLogin(event) {
//     window.location.href = URL.LOGIN;
//   }
//   /**
//    * 로그아웃
//    */
//   function onHandlerLogout(event) {
//     const request = firebaseAuth.signOutAuth();
//     request.then((result) => {
//       if (result === true) {
//         // 로그아웃 성공하면 메인 화면으로 새로고침
//         window.location.href = URL.CALCULET;
//       }
//     });
//   }

//   return (
//     <Wrapper ref={categoryBarRef.elementRef}>
//       <Positioner isChange={isChange}>
//         <Contents
//           isLoggedIn={isLoggedIn}
//           onIsOpen={() => categoryBarRef.setIsActive(!categoryBarRef.isActive)}
//           onLogin={onHandlerLogin}
//           onLogout={onHandlerLogout}
//         />
//       </Positioner>
//       {contentsCategory && (
//         <CategoryBar
//           contents={contentsCategory}
//           isActive={categoryBarRef.isActive}
//           setIsActive={categoryBarRef.setIsActive}
//         />
//       )}
//     </Wrapper>
//   );
// }

// export default Header;
