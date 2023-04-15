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
import { FlexColumnBox } from "../components/global-components/FlexBox";
import Password from "../components/setting/Password";
import useSx from "../hooks/useSx";
import SettingMenu from "../components/setting/SettingMenu";

function Setting() {
  // 설정 - 계정, 비밀번호 변경
  let { menu } = useGetUrlParam();
  const { settingAccountPage, settingPasswordPage } = usePage();
  const { isWindowMdDown } = useSx();

  // tab
  const [tabValue, setTabValue] = useState(0);
  const handleTabValueChange = (event, value) => {
    setTabValue(value);
  };

  // 탭 메뉴
  // useMemo - 재렌더링을 방지하기 위해 tabList배열의 초기화를 hook wrapping
  // [] 에 있는 값을 useMemo 메모 후, 종속성이 변경되지 않는 한 모든 렌더링에서 배열의 동일한 인스턴스를 반환
  let tabList = useMemo(
    () => [
      {
        label: "계정",
        icon: <PersonOutlineIcon />,
        content: <Account />,
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
  }, [menu, tabList]);

  return (
    <PageWhiteScreenBox>
      <PageScreenBox>
        {menu === undefined && isWindowMdDown && <SettingMenu />}
        {(!isWindowMdDown || (menu !== undefined && isWindowMdDown)) && (
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
            {!isWindowMdDown && (
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
            )}
          </Grid>
        )}
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Setting;
