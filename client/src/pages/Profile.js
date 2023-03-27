import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserCalculetList from "../components/profile/UserCalculetList";
import { handleGetUserInfo } from "../utils/handleActions";

function Profile() {
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    // userInfo: state.userInfo,
  }));

  // input 컴포넌트에 맞는 id변수 들
  const [userInfo, setUserInfo] = useState({
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    email: "",
    birthdate: "",
    sex: "",
  });

  // get user info
  useEffect(() => {
    if (idToken === "") return;

    handleGetUserInfo(idToken).then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="1.6rem">
        <Title content="프로필" />
        <ProfileHeader userInfo={userInfo} />
        <Divider />
        <UserCalculetList />
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default Profile;
