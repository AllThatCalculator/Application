import { Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/global-components/PageScreenBox";
import Account from "../components/setting/account/Account";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useGetUrlParam from "../hooks/useGetUrlParam";
import usePage from "../hooks/usePage";
import URL from "../components/PageUrls";
import { useSelector } from "react-redux";
import { FlexColumnBox } from "../components/global-components/FlexBox";
import { handleGetUserInfo } from "../utils/handleActions";
import Password from "../components/setting/Password";

function Setting() {
  // 설정 - 계정, 비밀번호 변경
  let { menu } = useGetUrlParam();
  const { settingAccountPage, settingPasswordPage } = usePage();

  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    // userInfo: state.userInfo,
  }));

  // tab
  const [tabValue, setTabValue] = useState(0);
  const handleTabValueChange = (event, value) => {
    setTabValue(value);
  };

  // 계정 : input 컴포넌트에 맞는 id변수들
  const [userInfoInputs, setUserInfoInputs] = useState({
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    email: "",
    birthdate: "",
    sex: "",
  });

  // const { userName, profileImgSrc, job, bio, email, birthdate, sex } =
  //   userInfoInputs;

  // 입력 event
  const handleUserInfoInput = (event) => {
    const { id, value } = event.target;

    setUserInfoInputs({
      ...userInfoInputs, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 input만의 value로 설정
    });
  };

  // 탭 메뉴
  // useMemo - 재렌더링을 방지하기 위해 tabList배열의 초기화를 hook wrapping
  // [] 에 있는 값을 useMemo 메모 후, 종속성이 변경되지 않는 한 모든 렌더링에서 배열의 동일한 인스턴스를 반환
  let tabList = useMemo(
    () => [
      {
        label: "계정",
        icon: <PersonOutlineIcon />,
        content: (
          <Account
            userInfo={userInfoInputs}
            handleUserInfoInput={handleUserInfoInput}
          />
        ),
        onClick: settingAccountPage,
        menuId: URL.ACCOUNT_ID,
      },
      {
        label: "비밀번호 변경",
        icon: <LockOutlinedIcon />,
        content: <Password />,
        onClick: settingPasswordPage,
        menuId: URL.PASSWORD_ID,
      },
    ],
    [settingAccountPage, settingPasswordPage]
  );

  // set page
  useEffect(() => {
    // "setting/" 일 시, "setting/account" 으로
    if (menu === undefined) {
      setTabValue(0); // 처음 컴포넌트 렌더
    } else {
      tabList.forEach((data, index) => {
        // 현재 url의 menu 변수 보고, 그에 맞는 페이지 렌더
        if (menu === data.menuId) {
          setTabValue(index);
        }
      });
    }
  }, []);

  // get user info
  useEffect(() => {
    if (idToken === "") return;
    handleGetUserInfo(idToken).then((data) => {
      setUserInfoInputs(data);
    });
  }, []);

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="2rem">
        <Grid container>
          <Grid item xs>
            {tabList.map(
              (data, index) =>
                index === tabValue && (
                  <FlexColumnBox key={index} gap="2rem">
                    {data.content}
                  </FlexColumnBox>
                )
            )}
          </Grid>
          <Grid item>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              allowScrollButtonsMobile
              value={tabValue}
              onChange={handleTabValueChange}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                width: "100%",
              }}
            >
              {tabList.map((data) => (
                <Tab
                  key={data.label}
                  label={data.label}
                  icon={data.icon}
                  iconPosition="start"
                  sx={{ justifyContent: "flex-start" }}
                  onClick={data.onClick}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Setting;
