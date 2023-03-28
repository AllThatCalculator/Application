import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSx from "../../../hooks/useSx";
import { handleGetUserInfo } from "../../../utils/handleActions";
import LoadingPage from "../../global-components/LoadingPage";
import Title from "../../global-components/Title";
import DeleteAccount from "./DeleteAccount";
import UpdateAccount from "./UpdateAccount";

function Account() {
  const { subTitleSx } = useSx();
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  // 계정 : input 컴포넌트에 맞는 id변수들
  const [userInfoInputs, setUserInfoInputs] = useState({
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    email: "", // 이메일(ID)
    birthdate: "",
    sex: "",

    emailNews: "", // 이메일(소식용)
  });

  // 입력 event
  const handleUserInfoInput = (event) => {
    const { id, value } = event.target;

    setUserInfoInputs({
      ...userInfoInputs, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 input만의 value로 설정
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  // get user info
  useEffect(() => {
    if (idToken === "") return;
    handleGetUserInfo(idToken).then((data) => {
      setUserInfoInputs({ ...data, emailNews: data.email });
      setIsLoading(false);
    });
  }, [idToken]);

  return (
    <>
      <Title content="계정" />
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <Typography sx={{ ...subTitleSx }}>계정 수정</Typography>
          <UpdateAccount
            userInfo={userInfoInputs}
            handleUserInfoInput={handleUserInfoInput}
          />
          <Divider />
          <Typography sx={{ ...subTitleSx }} color="error">
            계정 탈퇴
          </Typography>
          <DeleteAccount />
        </>
      )}
    </>
  );
}
export default Account;
