/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_CATEGORY = "calculetCategory/CALCULET_CATEGORY";

/** init State ( 초기 상태 ) */
const initialState = {
  category: {
    // 1: {
    //   name: 수학,
    //   0: 단위 변환기,
    //   1: 계산,
    //   2: 통계,
    //   3: 기하,
    //   99999: 기타
    // },
  },
  created_at: "",
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetCalculetCategory(data) {
  return { type: CALCULET_CATEGORY, data };
}

/** reducer정의 */
function calculetCategory(state = initialState, action) {
  switch (action.type) {
    case CALCULET_CATEGORY:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
export default calculetCategory;
