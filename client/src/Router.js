import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import Register from "./pages/Register";
import BookmarkBar from "./components/global-component/BookmarkBar";
import Login from "./pages/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calculet />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
