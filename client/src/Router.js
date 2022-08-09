import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import BookmarkBar from "./components/global-component/BookmarkBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import URL from "./components/PageUrls";
import Auth from "./hoc/auth";

const AppRouter = () => {
  return (
    <BrowserRouter>
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
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
