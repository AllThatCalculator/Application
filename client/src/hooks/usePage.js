import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";

/** 페이지 */
function usePage() {
  const navigate = useNavigate();

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

  return { calculetIdPage, registerPage, calculetListPage };
}
export default usePage;
