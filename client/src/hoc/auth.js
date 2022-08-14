import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../components/PageUrls";
import AuthUser from "../user-actions/AuthUser";

/**
 * 로그인 상태여야만 페이지에 들어갈 수 있는 Auth 구현
 * -> Auth(HOC) : 해당 유저가 페이지에 들어갈 자격 여부를 판단 후에, 되면 페이지로 가게하고 아니면 다른 페이지로 보냄.
 * @param {function} authComponent 확인할 페이지 컴포넌트
 */
function Auth({ authComponent }) {
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  AuthUser().then((res) => {
    // 로그인 X 상태
    if (!res.success) navigate(URL.LOGIN);
    // 로그인 O 상태
    else setComponent(authComponent);
  });
  return component;
}
export default Auth;
