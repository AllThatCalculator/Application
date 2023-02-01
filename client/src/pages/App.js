import AppRouter from "../Router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onGetCalculetCategory } from "../modules/calculetCategory";
import getCalculetCategory from "../user-actions/getCalculetCategory";
import { onGetUserInfo } from "../modules/userInfo";
import getUserInfo from "../user-actions/getUserInfo";
import getUserIdToken from "../utils/getUserIdToken";

function App() {
  /** Redux State */
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** get calculet category json */
  const handleGetCalculetCategory = (data) => {
    dispatch(onGetCalculetCategory(data));
  };
  /** get user info */
  const handleGetUserInfo = (data) => {
    dispatch(onGetUserInfo(data));
  };

  useEffect(() => {
    // login state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setIsSuccess(true);
      }
    });

    // calculet category
    getCalculetCategory().then((data) => {
      handleGetCalculetCategory(data);
    });

    setInit(true);
  }, []);

  useEffect(() => {
    // user info
    if (isLoggedIn) {
      getUserIdToken().then((token) => {
        if (token !== null) {
          getUserInfo(token).then((data) => {
            handleGetUserInfo(data);
          });
        }
      });
      setIsSuccess(true);
    }
  }, [isLoggedIn]);

  return <>{init && isSuccess && <AppRouter isLoggedIn={isLoggedIn} />}</>;
}

export default App;
