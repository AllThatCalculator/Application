import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";

/** 페이지 */
function usePage() {
  const navigate = useNavigate();

  // 메인 페이지
  function calculetPage() {
    navigate(URL.CALCULET);
  }

  // 계산기 상세
  function calculetIdPage(id) {
    navigate(URL.CALCULET + id);
  }

  // 계산기 등록
  function registerPage() {
    navigate(URL.REGISTER);
  }

  // 계산기 목록
  function calculetListPage() {
    navigate(URL.CALCULET_LIST);
  }

  // 로그인
  function loginPage() {
    navigate(URL.LOGIN);
  }
  // 회원가입
  function signUpPage() {
    navigate(URL.SIGN_UP);
  }

  return {
    calculetPage,
    calculetIdPage,
    registerPage,
    calculetListPage,
    loginPage,
    signUpPage,
  };
}
export default usePage;
