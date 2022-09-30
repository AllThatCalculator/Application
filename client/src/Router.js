import { BrowserRouter, Routes, Route } from "react-router-dom";
import URL from "./components/PageUrls";

// 공통
import Header from "./pages/Header";
// import BookmarkBar from "./components/global-component/BookmarkBar";

import Auth from "./hoc/auth";

// 페이지
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import CalculetList from "./pages/CalculetList";

// google-analytics
import RouteChangeTracker from "./components/google-analytics/RouteChangeTracker";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Header />
      <Routes>
        <Route path={URL.CALCULET} element={<Calculet />}>
          <Route path=":id" element={<Calculet />} />
        </Route>
        <Route
          path={URL.REGISTER}
          element={<Auth authComponent={<Register />} />}
        />
        <Route path={URL.LOGIN} element={<Login />} />
        <Route path={URL.SIGN_UP} element={<SignUp />} />
        <Route path={URL.SEARCH} element={<Search />} />
        <Route path={URL.CALCULET_LIST} element={<CalculetList />} />
      </Routes>
      {/* <BookmarkBar /> */}
    </BrowserRouter>
  );
};

export default AppRouter;
