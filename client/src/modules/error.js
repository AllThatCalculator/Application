const IS_ERROR_FALSE = "error/IS_ERROR_FALSE";
const ERROR_TYPE = "error/ERROR_TYPE";
const ERROR_INVALID_PASSWORD = "error/ERROR_INVALID_PASSWORD";
const ERROR_EMAIL_ALREADY_IN_USE = "error/ERROR_EMAIL_ALREADY_IN_USE";
const ERROR_INVALID_EMAIL = "error/ERROR_INVALID_EMAIL";
const ERROR_WEAK_PASSWORD = "error/ERROR_WEAK_PASSWORD";
const ERROR_OPERATION_NOT_ALLOWED = "error/ERROR_OPERATION_NOT_ALLOWED";
const ERROR_USER_NOT_FOUND = "error/ERROR_USER_NOT_FOUND";
const ERROR_WRONG_PASSWORD = "error/ERROR_WRONG_PASSWORD";
const ERROR_TOO_MANY_REQUESTS = "error/ERROR_TOO_MANY_REQUESTS";
const ERROR_PROVIDER_ALREADY_LINKED = "error/ERROR_PROVIDER_ALREADY_LINKED";
const ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL =
  "error/ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL";
const ERROR_INVALID_DATE = "error/ERROR_INVALID_DATE";
const ERROR_SPECIAL_SYMBOLS = "error/ERROR_SPECIAL_SYMBOLS";

// init State ( 초기 상태 )
const initialState = {
  isError: false,
  errorType: "",
  authError: "", // login, signup 관련 error
};

// Action Creator Function ( 액션 생성 함수 )
export const setClearError = () => ({
  type: IS_ERROR_FALSE,
});
export const setErrorType = (data) => ({
  type: ERROR_TYPE,
  data,
});
export const setAuthError = (data) => ({
  type:
    (data === "invalid-password" && ERROR_INVALID_PASSWORD) ||
    (data === "auth/email-already-in-use" && ERROR_EMAIL_ALREADY_IN_USE) ||
    (data === "auth/invalid-email" && ERROR_INVALID_EMAIL) ||
    (data === "auth/weak-password" && ERROR_WEAK_PASSWORD) ||
    (data === "auth/operation-not-allowed" && ERROR_OPERATION_NOT_ALLOWED) ||
    (data === "auth/user-not-found" && ERROR_USER_NOT_FOUND) ||
    (data === "auth/wrong-password" && ERROR_WRONG_PASSWORD) ||
    (data === "auth/too-many-requests" && ERROR_TOO_MANY_REQUESTS) ||
    (data === "auth/provider-already-linked" &&
      ERROR_PROVIDER_ALREADY_LINKED) ||
    (data === "auth/account-exists-with-different-credential" &&
      ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL) ||
    (data === "invalid-date" && ERROR_INVALID_DATE) ||
    (data === "special-symbols" && ERROR_SPECIAL_SYMBOLS),
});

export default function error(state = initialState, action) {
  switch (action.type) {
    case IS_ERROR_FALSE:
      return {
        ...state,
        isError: false,
        errorType: "",
      };
    case ERROR_TYPE:
      return {
        ...state,
        errorType: action.data,
      };
    case ERROR_INVALID_PASSWORD:
      return {
        ...state,
        authError: "비밀번호가 일치하지 않습니다.",
        isError: true,
      };
    case ERROR_EMAIL_ALREADY_IN_USE:
      return {
        ...state,
        authError: "이미 사용중인 이메일입니다.",
        isError: true,
      };
    case ERROR_INVALID_EMAIL:
      return {
        ...state,
        authError: "이메일을 입력해주세요",
        isError: true,
      };
    case ERROR_WEAK_PASSWORD:
      return {
        ...state,
        authError:
          "안전하지 않은 비밀번호입니다.\n다른 비밀번호를 사용해 주세요.",
        isError: true,
      };
    case ERROR_OPERATION_NOT_ALLOWED:
      return {
        ...state,
        authError: "관리자에게 문의하세요.",
        isError: true,
      };
    case ERROR_USER_NOT_FOUND:
      return {
        ...state,
        authError: "해당 이메일로 가입되어 있지 않습니다.",
        isError: true,
      };
    case ERROR_WRONG_PASSWORD:
      return {
        ...state,
        authError: "비밀번호가 잘못되었습니다.",
        isError: true,
      };
    case ERROR_TOO_MANY_REQUESTS:
      return {
        ...state,
        authError:
          "죄송합니다. 최근에 너무 많은 요청을 보내셨습니다. 나중에 다시 시도하세요.",
        isError: true,
      };
    case ERROR_PROVIDER_ALREADY_LINKED:
      return {
        ...state,
        authError: "이미 가입한 계정입니다.",
        isError: true,
      };
    case ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
      return {
        ...state,
        authError: "다른 인증 방식으로 존재하는 계정입니다.",
        isError: true,
      };
    case ERROR_INVALID_DATE:
      return {
        ...state,
        authError: "유효한 날짜가 아닙니다.",
        isError: true,
      };
    case ERROR_SPECIAL_SYMBOLS:
      return {
        ...state,
        authError: "공백 혹은 특수문자를 제거해주세요.",
        isError: true,
      };
    default:
      return state;
  }
}
