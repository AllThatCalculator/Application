import { List } from "@mui/material";
import Title from "../common/Title";
import MenuListItem from "./MenuListItem";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import usePage from "../../../hooks/usePage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

/**
 * 설정 페이지 - (리스판시브) md 이하 페이지에서 보여줌
 * @returns
 */
function SettingMenu() {
  const { settingAccountPage, settingPasswordPage } = usePage();

  const list = [
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "계정",
      handleOnClick: settingAccountPage,
    },
    {
      icon: <LockOutlinedIcon />,
      title: "비밀번호 변경",
      handleOnClick: settingPasswordPage,
    },
  ];

  return (
    <>
      <Title content="설정" />
      <List>
        {list.map((data) => {
          const { icon, title, handleOnClick } = data;
          return (
            <MenuListItem
              key={title}
              icon={icon}
              title={title}
              handleOnClick={handleOnClick}
            />
          );
        })}
      </List>
    </>
  );
}
export default SettingMenu;
