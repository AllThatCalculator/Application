import LogoHeader from "../components/atom-components/LogoHeader";
import CategoryBar from "../components/global-components/CategoryBar";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import URL from "../components/PageUrls";
import firebaseAuth from "../firebaseAuth";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
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
import usePage from "../hooks/usePage";
import { useDispatch, useSelector } from "react-redux";
import getCalculetList from "../user-actions/calculets/getCalculetList";
import {
  onSetCalculetConverters,
  onSetCalculetList,
} from "../modules/calculetList";
import useGetCategoryList from "../hooks/useGetCategoryList";
import getCalculetConverters from "../user-actions/calculets/getCalculetConverters";
import { FlexBox } from "../components/global-components/FlexBox";
import SearchBar from "../components/search/SearchBar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

/**
 * 헤더에 있는 컴포넌트들
 * -> 카테고리바, 로고, 검색창, 로그인/아웃 버튼
 * @param {function} onIsOpen 버튼 이벤트 (카테고리바 버튼 이벤트)
 * @param {function} onLogout 로그아웃 이벤트 (로그아웃 버튼 이벤트)
 */
function Contents({ isLoggedIn, onIsOpen, onLogout }) {
  const { loginPage, signUpPage, profilePage, settingPage } = usePage();

  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));

  // 내 계정 팝업 리스트
  const myAccountList = [
    [
      {
        name: "프로필",
        icon: <AccountCircleOutlinedIcon />,
        onClickFuntion: profilePage,
      },
      {
        name: "설정",
        icon: <SettingsOutlinedIcon />,
        onClickFuntion: settingPage,
      },
    ],
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
    // 내 계정
    {
      isMd: true,
      popupIcon: (
        <Avatar
          src={isLoggedIn ? userInfo.profileImgSrc : ""}
          sx={{
            width: avatarSizeSx,
            height: avatarSizeSx,
            // 헤더에 png 파일로 들어가면 배경색이랑 겹쳐져서 안 보일 수 있음
            bgcolor: userInfo.profileImgSrc !== null ? "white" : "",
          }}
        />
      ),
      popupTitle: "내 계정",
      popupListData: myAccountList,
      popupContent: userInfoComponent,
    },
  ];

  return (
    <>
      <FlexBox
        sx={{
          justifyContent: "space-between",
          width: "100%",
          gap: "2.4rem",
        }}
      >
        <FlexBox sx={{ alignItems: "center" }}>
          <IconButton
            sx={{ ...sizeSx }}
            edge="start"
            color="inherit"
            onClick={onIsOpen}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <LogoHeader />
        </FlexBox>
        <FlexBox
          sx={{
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
                {/* 검색창 */}
                <SearchBar />
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
        </FlexBox>
      </FlexBox>
    </>
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
