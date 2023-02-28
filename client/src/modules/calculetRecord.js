/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_RECORD_LIST = "calculetRecord/CALCULET_RECORD_LIST";
const CALCULET_OBJECT = "calculetRecord/CALCULET_OBJECT";
const CALCULET_RECENT_LIST = "calculetRecord/CALCULET_RECENT_LIST";
const CALCULET_RECENT_LIST_APPEND =
  "calculetRecord/CALCULET_RECENT_LIST_APPEND";

/** init State ( 초기 상태 ) */
const initialState = {
  recordList: [], // 계산 내역(DB에 저장됨) | { inputObj: {}, outputObj: {}, createdAt: "", id: "" }
  recentList: [], // 최근에 계산한 내역(DB에 저장 안 됨)
  // obj
  calculetObj: {
    inputObj: {},
    outputObj: {},
    calculetId: "",
  },
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetCalculetRecord(data) {
  return { type: CALCULET_RECORD_LIST, data };
}
export function onSetCalculetObj(data) {
  return { type: CALCULET_OBJECT, data };
}
export function onSetCalculetRecent(data) {
  return { type: CALCULET_RECENT_LIST, data };
}
export function onAppendCalculetRecent(data) {
  return { type: CALCULET_RECENT_LIST_APPEND, data };
}

/** reducer정의 */
function calculetRecord(state = initialState, action) {
  switch (action.type) {
    case CALCULET_RECORD_LIST:
      return {
        ...state,
        recordList: [...action.data],
      };
    case CALCULET_OBJECT:
      return {
        ...state,
        calculetObj: action.data,
      };
    case CALCULET_RECENT_LIST:
      return {
        ...state,
        recentList: [...action.data],
      };
    case CALCULET_RECENT_LIST_APPEND:
      return {
        ...state,
        recentList: [...state.recentList, action.data],
      };
    default:
      return state;
  }
}
export default calculetRecord;
