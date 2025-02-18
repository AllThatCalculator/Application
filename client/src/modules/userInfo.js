/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const USER_INFO = "userInfo/USER_INFO";
const USER_ID_TOKEN = "userInfo/USER_ID_TOKEN";

/** init State ( 초기 상태 ) */
const initialState = {
  // 기본 정보
  userName: "",
  profileImgSrc: "",
  // id token
  idToken: "",
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetUserInfo(data) {
  return { type: USER_INFO, data };
}
export function onSetUserIdToken(data) {
  return { type: USER_ID_TOKEN, data };
}

/** reducer정의 */
function userInfo(state = initialState, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        ...action.data,
      };
    case USER_ID_TOKEN:
      return {
        ...state,
        idToken: action.data,
      };
    default:
      return state;
  }
}
export default userInfo;
