import AppRouter from "../Router";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onSetCalculetCategory } from "../modules/calculetCategory";
import getCalculetCategory from "../user-actions/getCalculetCategory";
import { onSetUserInfo } from "../modules/userInfo";
import getUserInfo from "../user-actions/getUserInfo";
import getUserIdToken from "../utils/getUserIdToken";

function App() {
  /** Redux State */
  const dispatch = useDispatch();

  const [init, setInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** set calculet category json */
  const handleGetCalculetCategory = useCallback(
    (data) => {
      dispatch(onSetCalculetCategory(data));
    },
    [dispatch]
  );
  /** set user info */
  const handleSetUserInfo = useCallback(
    (data) => {
      dispatch(onSetUserInfo(data));
    },
    [dispatch]
  );

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
  }, [handleGetCalculetCategory]);

  useEffect(() => {
    // user info
    if (isLoggedIn) {
      getUserIdToken().then((token) => {
        if (token !== null) {
          getUserInfo(token).then((data) => {
            handleSetUserInfo(data);
          });
        }
      });
      setIsSuccess(true);
    }
  }, [isLoggedIn, handleSetUserInfo]);

  return <>{init && isSuccess && <AppRouter isLoggedIn={isLoggedIn} />}</>;
}

export default App;
