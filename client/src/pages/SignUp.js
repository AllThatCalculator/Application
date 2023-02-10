import { useCallback, useEffect, useState } from "react";
import { StyledImg } from "../components/atom-components/BoxIcon";
import SignUpFirebase from "../components/sign-up/SignUpFirebase";
import SignUpInform from "../components/sign-up/SignUpInform";
import usePreventLeave from "../hooks/usePreventLeave";
import firebaseAuth from "../firebaseAuth";
import { PageWhiteScreenBox } from "../components/global-components/PageScreenBox";
import { FlexColumnBox } from "../components/global-components/FlexBox";
import useSx from "../hooks/useSx";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import usePage from "../hooks/usePage";

/**
 * 회원가입 페이지
 */
function SignUp({ isLoggedIn }) {
  const { widthSx } = useSx();

  const { backPage } = usePage();

  // redux state
  const { isLoading, userName, idToken } = useSelector((state) => ({
    isLoading: state.loading.isLoading,
    userName: state.userInfo.userName,
    idToken: state.userInfo.idToken,
  }));

  // 훅 관리하는 state
  const [isActive, setIsActive] = useState(false);

  // 이메일|소셜 회원가입 후, 정보 입력 컴포넌트 활성화 여부
  const [isActiveInform, setIsActiveInform] = useState(false);

  function activateEvent() {
    setIsActive(true);
  }

  function deactivateEvent() {
    setIsActive(false);
  }

  function activateComponent() {
    setIsActive(true);
    setIsActiveInform(true);
  }

  const preventLeaveHandler = useCallback(() => {
    const request = firebaseAuth.deleteAuth();
    request.then((result) => {
      if (result === true) {
        // console.log("회원 정보 삭제");
      } else {
        // console.log("오류");
      }
    });
  }, []);

  // 페이지 나갈 때 관리하는 훅
  const preventLeave = usePreventLeave(preventLeaveHandler);

  useEffect(() => {
    if (isActive) {
      preventLeave.enablePrevent();
    } else {
      preventLeave.disablePrevent();
    }
  }, [isActive, preventLeave]);

  useEffect(() => {
    // login 상태면, 튕겨내기
    if (isLoggedIn && userName !== "" && idToken !== null) {
      backPage();
    }
  }, [isLoggedIn, userName, idToken]);

  return (
    <PageWhiteScreenBox
      container
      sx={{
        justifyContent: "center",
        pointerEvents: isLoading ? "none" : "auto",
      }}
    >
      <FlexColumnBox
        sx={{ ...widthSx, maxWidth: !isActiveInform ? "40rem" : "48rem" }}
      >
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
        {isLoading && <LinearProgress />}

        {!isActiveInform && (
          <SignUpFirebase activateComponent={activateComponent} />
        )}
        {isActiveInform && (
          <SignUpInform
            activateEvent={activateEvent}
            deactivateEvent={deactivateEvent}
          />
        )}
      </FlexColumnBox>
    </PageWhiteScreenBox>
  );
}
export default SignUp;

// import { useCallback, useEffect, useState } from "react";
// import styled from "styled-components";
// import { StyledImg } from "../components/atom-components/BoxIcon";
// import { ContentLayout, White300Layout } from "../components/Layout";

// import SignUpFirebase from "../components/sign-up/SignUpFirebase";
// import SignUpInform from "../components/sign-up/SignUpInform";
// import usePreventLeave from "../hooks/usePreventLeave";
// import firebaseAuth from "../firebaseAuth";

// /**
//  * 흰색 뒷 배경
//  */
// const StyledWhite300 = styled(White300Layout)`
//   position: fixed;
//   top: 60px;
//   bottom: 0;
//   z-index: -1;
// `;
// /**
//  * 회원가입 크기 530px
//  * 윗부분에 패딩을 주기 위한 스타일 정의
//  */
// const WrapperPad = styled(ContentLayout)`
//   flex-direction: column;
//   width: 530px;
//   padding: 50px 0px;
//   gap: ${(props) => props.gap};
// `;

// /**
//  * 회원가입 페이지
//  */
// function SignUp() {
//   // 훅 관리하는 state
//   const [isActive, setIsActive] = useState(false);

//   // 정보 입력 컴포넌트 활성화 여부
//   const [isActiveInform, setIsActiveInform] = useState(false);

//   function activateEvent() {
//     setIsActive(true);
//   }

//   function deactivateEvent() {
//     setIsActive(false);
//   }

//   function activateComponent() {
//     setIsActive(true);
//     setIsActiveInform(true);
//   }

//   const preventLeaveHandler = useCallback(() => {
//     const request = firebaseAuth.deleteAuth();
//     request.then((result) => {
//       if (result === true) {
//         console.log("회원 정보 삭제");
//       } else {
//         console.log("오류");
//       }
//     });
//   }, []);

//   // 페이지 나갈 때 관리하는 훅
//   const preventLeave = usePreventLeave(preventLeaveHandler);

//   useEffect(() => {
//     if (isActive) {
//       preventLeave.enablePrevent();
//     } else {
//       preventLeave.disablePrevent();
//     }
//   }, [isActive, preventLeave]);

//   return (
//     <>
//       <StyledWhite300 />
//       <WrapperPad gap="20px">
//         <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
//         {!isActiveInform && (
//           <SignUpFirebase activateComponent={activateComponent} />
//         )}
//         {isActiveInform && (
//           <SignUpInform
//             activateEvent={activateEvent}
//             deactivateEvent={deactivateEvent}
//           />
//         )}
//       </WrapperPad>
//     </>
//   );
// }
// export default SignUp;
