import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";

/** 페이지 */
function usePage() {
  const navigate = useNavigate();

  function RegisterPage() {
    navigate(URL.REGISTER);
  }

  return { RegisterPage };
}
export default usePage;
