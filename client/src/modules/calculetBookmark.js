/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_BOOKMARK = "calculetBookmark/CALCULET_BOOKMARK";
const CALCULET_BOOKMARK_IS_LOADING =
  "calculetBookmark/CALCULET_BOOKMARK_IS_LOADING";

/** init State ( 초기 상태 ) */
const initialState = {
  bookmark: [],
  // [
  //     {
  //       "id": "9dc33a8f-7647-4598-ac0b-2d1089c89404",
  //       "title": "테스트 계산기"
  //     }
  //   ]
  isLoading: true,
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetCalculetBookmark(data) {
  return { type: CALCULET_BOOKMARK, data };
}
export function onSetCalculetBookmarkLoading(data) {
  return { type: CALCULET_BOOKMARK_IS_LOADING, data };
}

/** reducer정의 */
function calculetBookmark(state = initialState, action) {
  switch (action.type) {
    case CALCULET_BOOKMARK:
      return { ...state, bookmark: action.data };
    case CALCULET_BOOKMARK_IS_LOADING:
      return { ...state, isLoading: action.data };
    default:
      return state;
  }
}
export default calculetBookmark;
