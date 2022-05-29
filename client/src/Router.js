import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Calculet from "./pages/Calculet";
import BookmarkBar from "./components/global-component/BookmarkBar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calculet />}></Route>
      </Routes>
      <BookmarkBar />
    </BrowserRouter>
  );
};

export default AppRouter;
