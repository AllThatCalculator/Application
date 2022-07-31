import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/user-actions/AuthUser";

/**
 * 인증이 이뤄져야만 페이지에 들어갈 수 있는 Auth 구현
 * -> Auth(HOC) : 해당 유저가 페이지에 들어갈 자격 여부를 판단 후에, 되면 페이지로 가게하고 아니면 다른 페이지로 보냄.
 * @param {function, boolean}
 * SpecificComponent : 확인할 페이지 컴포넌트
 * option
 * -> null : 아무나 출입이 가능한 페이지
 * -> true : 로그인한 유저만 출입이 가능한 페이지
 * -> false : 로그인한 유저는 출입 불가능한 페이지
 */
export default function (SpecificComponent, option) {
  function AuthenticationCheck() {
    const navigate = useNavigate();

    // 페이지 이동할 때마다 인가
    useEffect(() => {
      const check = AuthUser();
      check.then((res) => {
        // 로그인 상태
        if (res.success) {
          // 로그인 한 유저만 입장 가능
          if (option) return <SpecificComponent />;
        }
        // 로그인 안 한 상태
        else {
          navigate("/login");
        }
      });
    }, []);
  }
  return AuthenticationCheck;
}
