/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const USER_INFO = "userInfo/USER_INFO";

/** init State ( 초기 상태 ) */
const initialState = {
  userName: "",
  bio: "",
  sex: "",
  birthdate: "",
  job: "",
  profileImgSrc: "",
  email: "",
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetUserInfo(data) {
  return { type: USER_INFO, data };
}

/** reducer정의 */
function userInfo(state = initialState, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
export default userInfo;
