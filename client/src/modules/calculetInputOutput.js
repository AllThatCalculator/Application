/**
 * calculetInputOutput
 * 계산기 블록의 입/출력값 관리
 */

/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_INPUT_OUTPUT_INIT = "calculetInputOutput/INIT";
const CALCULET_INPUT_OUTPUT_UPDATE = "calculetInputOutput/UPDATE";
const CALCULET_INPUT_OUTPUT_EXECUTE = "calculetInputOutput/EXECUTE";

/** init State ( 초기 상태 ) */
// key: 변수 이름(id), value: 실제 값으로 관리.
const initialState = {};

/**
 * 액션 종류
 * 1. set -> 계산기에 따라 기본값으로 세팅하는 과정
 * 2. update -> 사용자의 입력/계산에 따라 입출력 값 업데이트
 * 3. execute -> 계산하기
 */

/** Action Creator Function ( 액션 생성 함수 ) */
export function onInitCalculetInputOutput(data) {
  return { type: CALCULET_INPUT_OUTPUT_INIT, data };
}
export function onUpdateCalculetInputOutput(data) {
  return { type: CALCULET_INPUT_OUTPUT_UPDATE, data };
}
export function onCalculetExecute(data) {
  return { type: CALCULET_INPUT_OUTPUT_EXECUTE, data };
}

// 계산기 입출력 값 관리

//
function calculetInputOutput(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case CALCULET_INPUT_OUTPUT_INIT:
      // 계산기 컴포넌트로 calculetObject 초기화
      return {
        ...data,
      };
    case CALCULET_INPUT_OUTPUT_UPDATE:
      // 입력& 출력값 업데이트
      return {
        ...state,
        [data.componentId]: data.value,
      };
    case CALCULET_INPUT_OUTPUT_EXECUTE:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}

export default calculetInputOutput;
