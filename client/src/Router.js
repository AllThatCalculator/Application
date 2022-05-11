import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global-component/Header";
import Calculet from "./pages/Calculet";
import Test from "./pages/Test";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calculet />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
