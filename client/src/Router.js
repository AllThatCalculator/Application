import { BrowserRouter, Routes, Route } from "react-router-dom";
import URL from "./components/PageUrls";

// 공통
import Header from "./pages/Header";

import Auth from "./hoc/auth";

// 페이지
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import CalculetList from "./pages/CalculetList";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import CalculetSubList from "./pages/CalculetSubList";
import RegisterTest from "./pages/RegisterTest";

// google-analytics
import RouteChangeTracker from "./components/google-analytics/RouteChangeTracker";
import Snackbars from "./components/global-components/Snackbars";
import DeleteComplete from "./pages/guide/DeleteComplete";

// container
import LoginContainer from "./containers/LoginContainer";

function AppRouter({ isLoggedIn }) {
  const PATH_CALCULET_ID = ":" + URL.CALCULET_ID;
  /** ?SEARCH_ID=:SEARCH_ID | search?keyword="" */
  const PATH_SEARCH_ID = "?" + URL.SEARCH_ID + "=:" + URL.SEARCH_ID;
  /** setting/"" */
  const PATH_SETTING_ID = ":" + URL.MENU_ID;
  /** calculet-list/"" */
  const PATH_CALCULET_LIST_ID = ":" + URL.CATEGORY_MAIN_ID;

  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Header isLoggedIn={isLoggedIn} />
      <Snackbars />
      <Routes>
        <Route path={URL.CALCULET} element={<Calculet />}>
          <Route path={PATH_CALCULET_ID} element={<Calculet />} />
        </Route>
        <Route
          path={URL.REGISTER}
          element={
            <Auth isLoggedIn={isLoggedIn} authComponent={<Register />} />
          }
        />
        <Route path={URL.REGISTER_TEST} element={<RegisterTest />} />
        <Route
          path={URL.LOGIN}
          element={<LoginContainer isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={URL.SIGN_UP}
          element={<SignUp isLoggedIn={isLoggedIn} />}
        />
        <Route path={URL.SEARCH} element={<Search />}>
          <Route path={PATH_SEARCH_ID} element={<Search />} />
        </Route>
        <Route path={URL.CALCULET_LIST} element={<CalculetList />}>
          <Route path={PATH_CALCULET_LIST_ID} element={<CalculetSubList />} />
        </Route>

        <Route
          path={URL.PROFILE}
          element={<Auth isLoggedIn={isLoggedIn} authComponent={<Profile />} />}
        />

        {/* 설정 - 계정, 저작 권한, 비밀번호 변경 */}
        <Route
          path={URL.SETTING}
          element={<Auth isLoggedIn={isLoggedIn} authComponent={<Setting />} />}
        >
          <Route path={PATH_SETTING_ID} element={<Setting />} />
        </Route>

        {/*회원탈퇴 완료 */}
        <Route path={URL.DELETE_COMPLETE} element={<DeleteComplete />} />
      </Routes>
      {/* <BookmarkBar /> */}
    </BrowserRouter>
  );
}

export default AppRouter;
