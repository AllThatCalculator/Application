import AppRouter from "../Router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onSetCalculetCategory } from "../modules/calculetCategory";
import getCalculetCategory from "../user-actions/getCalculetCategory";
import { onSetUserInfo, onSetUserIdToken } from "../modules/userInfo";
import { handleGetUserMe } from "../utils/handleUserActions";
import firebaseAuth from "../firebaseAuth";

function App() {
  /** Redux State */
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setInit(false);
    setIsSuccess(false);
    setIsLoggedIn(false);

    // console.log(auth);
    // login state
    onAuthStateChanged(auth, (user) => {
      // 회원가입 시, 이미 가입한 계정으로 회원가입하면 로그인되는 상황을 막고자 update막음
      // or off login
      if (user === null) {
        /** set token null */
        dispatch(onSetUserIdToken(""));
        dispatch(
          onSetUserInfo({
            userName: "",
            profileImgSrc: "",
          })
        );
        setIsSuccess(true);
      } else if (!!user) {
        // setIsLoggedIn(false);
        // on login
        const token = user.accessToken;

        if (token !== null) {
          /** set user info */
          handleGetUserMe(token).then((data) => {
            // success 사용자 있음 : me update & 메인 페이지
            if (!!data) {
              dispatch(onSetUserInfo(data));
              setIsSuccess(true);
              setIsLoggedIn(true);
              /** set user id token */
              dispatch(onSetUserIdToken(token));
            }
            // error 사용자 없음 : delete(동시에 로그아웃 됨)
            else {
              firebaseAuth.deleteAuth();
            }
          });
        }
      }
    });

    // calculet category
    getCalculetCategory().then((data) => {
      /** set calculet category json */
      dispatch(onSetCalculetCategory(data));
      setInit(true);
    });
  }, [dispatch]);

  return <>{init && isSuccess && <AppRouter isLoggedIn={isLoggedIn} />}</>;
}

export default App;
