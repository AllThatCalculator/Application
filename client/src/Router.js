import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/global-component/Header";
import Calculet from "./pages/Calculet";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Calculet />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
