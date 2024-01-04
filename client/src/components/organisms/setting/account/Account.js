import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../../firebase";
import firebaseAuth from "../../../../firebaseAuth";
import useError from "../../../../hooks/useError";
import useInput from "../../../../hooks/useInput";
import usePage from "../../../../hooks/usePage";
import useSnackbar from "../../../../hooks/useSnackbar";
import useSx from "../../../../hooks/useSx";
import { onSetUserIdToken, onSetUserInfo } from "../../../../modules/userInfo";
import getUserMe from "../../../../user-actions/users/getUserMe";
import {
  handleDeleteUser,
  handleGetUserInfo,
  handlePatchUserInfo,
} from "../../../../utils/handleUserActions";
import LoadingPage from "../../common/LoadingPage";
import Title from "../../common/Title";
import DeleteAccount from "./DeleteAccount";
import UpdateAccount from "./UpdateAccount";

function Account() {
  const { subTitleSx } = useSx();
  const { openSnackbar } = useSnackbar();
  const { deleteCompletePage } = usePage();

  // error state
  const { handleSetAuthError, handleSetErrorType } = useError();

  const dispatch = useDispatch();
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));
  const currentUserEmail = auth.currentUser.email; // 현재 사용자 email

  // 계정 수정 : input 컴포넌트에 맞는 id변수들
  const [userInfoInputs, setUserInfoInputs] = useState({
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    emailId: "", // 이메일(ID)-firebase
    email: "", // 이메일(소식용)-DB
    birthdate: "",
    sex: "",
  });
  const { userName, job, bio, email, emailId } = userInfoInputs;
  /** 프로필 사진 */
  const [profileImg, setProfileImg] = useState({
    url: "",
    file: null,
  });
  // 입력 event
  const handleUserInfoInput = (event) => {
    const { id, value } = event.target;

    setUserInfoInputs({
      ...userInfoInputs, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 input만의 value로 설정
    });
  };

  // 계정 탈퇴 : 비밀번호
  const { value: password, onChange: onChangePassword } = useInput("");

  // get user info loading
  const [isLoading, setIsLoading] = useState(true);

  // 계정 변경 내용 저장 click event
  function onSubmitEditAccount(event) {
    event.preventDefault();
    setIsLoading(true);

    // 서버에 보낼 정보 => body
    let body = {
      profileImg: profileImg.file,
      userInfo: {
        email: email,
        userName: userName,
        job: job,
        bio: bio,
      },
    };
    handlePatchUserInfo(idToken, body).then((data) => {
      if (data) {
        openSnackbar(
          "success",
          "변경되었습니다.",
          true,
          "top",
          "center",
          1600 // 지속시간
        );
      }
      // update user info (account page)
      handleGetUserInfo(idToken).then((data) => {
        setUserInfoInputs({ ...data, emailId: currentUserEmail }); // set info from DB & email Id from firebase
        setProfileImg({ ...profileImg, url: data.profileImgSrc }); // set profile img
        setIsLoading(false);
      });
      // update me (header)
      getUserMe(idToken).then((data) => {
        dispatch(onSetUserInfo(data));
      });
    });
  }

  // delete user loading
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  // 계정 탈퇴 제출
  async function onSubmitDeleteAccount() {
    await setIsDeleteLoading(true);

    // 보안이 민감하기 때문에 최근에 로그인해야 함. 아래와 같은 절차 진행
    // 01. 현재 사용자가 입력한 현재 비밀번호로부터 credential 발급
    const credential = await firebaseAuth.getCredential(password);
    // 02. 발급받은 credential로 재로그인
    const result = await firebaseAuth.signInWithCredential(credential);
    // success
    if (result === true) {
      // 03. 계정 탈퇴 요청
      onDeleteAccount();
    }
    // error
    else {
      handleSetAuthError(result);
      setIsDeleteLoading(false);
      switch (result) {
        // => 예외처리 ) 사용자가 입력한 현재 비밀번호가 틀림
        case "auth/wrong-password":
          handleSetErrorType("password");
          break;
        case "auth/too-many-requests":
          handleSetErrorType("password");
          break;
        default:
          break;
      }
    }
  }
  // 계정 탈퇴 요청
  function onDeleteAccount() {
    handleDeleteUser(idToken).then((result) => {
      setIsDeleteLoading(false);

      // success
      if (result) {
        /** set token null */
        dispatch(onSetUserIdToken(""));
        dispatch(
          onSetUserInfo({
            userName: "",
            profileImgSrc: "",
          })
        );
        // sign out
        const request = firebaseAuth.signOutAuth();
        request.then((result) => {
          if (result === true) {
            // 로그아웃 성공하면 새로고침
            window.location.reload();
          }
        });
        // 회원탈퇴 페이지로
        deleteCompletePage();
      }
      // error
      else {
        openSnackbar(
          "error",
          "다시 시도해주세요.",
          true,
          "top",
          "center",
          1600 // 지속시간
        );
      }
    });
  }

  // get user info
  useEffect(() => {
    if (idToken === "") return;
    // get user info
    handleGetUserInfo(idToken).then((data) => {
      setUserInfoInputs({ ...data, emailId: currentUserEmail }); // set info from DB & email Id from firebase
      setProfileImg((profileImg) => ({
        ...profileImg,
        url: data.profileImgSrc,
      })); // set profile img
      setIsLoading(false);
    });
    /** set user id token */
    dispatch(onSetUserIdToken(idToken));
  }, [idToken, currentUserEmail, dispatch]);

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
            handleOnClickEditAccount={onSubmitEditAccount}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          />
          <Divider />
          <Typography sx={{ ...subTitleSx }} color="error">
            계정 탈퇴
          </Typography>
          <DeleteAccount
            handleOnClickDeleteAccount={onSubmitDeleteAccount}
            email={emailId}
            password={password}
            onChangePassword={onChangePassword}
            isLoading={isDeleteLoading}
          />
        </>
      )}
    </>
  );
}
export default Account;
