import AppRouter from "../Router";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { onSetCalculetCategory } from "../modules/calculetCategory";
import getCalculetCategory from "../user-actions/getCalculetCategory";
import { onSetUserInfo, onSetUserIdToken } from "../modules/userInfo";
import getUserInfo from "../user-actions/getUserInfo";

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
  /** set user id token */
  const handleSetUserIdToken = useCallback(
    (data) => {
      dispatch(onSetUserIdToken(data));
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
    setInit(false);
    setIsSuccess(false);

    // login state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // on login
        setIsLoggedIn(true);
        const token = user.accessToken;

        if (token !== null) {
          // me
          getUserInfo(token).then((data) => {
            handleSetUserInfo(data);
          });
          handleSetUserIdToken(token);
        }
        setIsSuccess(true);
      }
      // off login
      else {
        setIsLoggedIn(false);
        handleSetUserIdToken(null);
        setIsSuccess(true);
      }
    });

    // calculet category
    getCalculetCategory().then((data) => {
      handleGetCalculetCategory(data);
      setInit(true);
    });
  }, [handleGetCalculetCategory, handleSetUserIdToken]);

  return <>{init && isSuccess && <AppRouter isLoggedIn={isLoggedIn} />}</>;
}

export default App;
