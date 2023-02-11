/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const LOADING_FALSE = "loading/LOADING_FALSE"; // -> false
const LOADING_TRUE = "loading/LOADING_TRUE"; // -> true

/** init State ( 초기 상태 ) */
const initialState = {
  isLoading: false,
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onLoading() {
  return { type: LOADING_TRUE };
}
export function offLoading() {
  return { type: LOADING_FALSE };
}

/** reducer정의 */
function loading(state = initialState, action) {
  switch (action.type) {
    case LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
export default loading;
