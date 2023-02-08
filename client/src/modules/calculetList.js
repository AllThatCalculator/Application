/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_LIST = "calculetList/CALCULET_LIST"; // 계산기 전체 목록 | 단위 변환기 제외.
const CALCULET_CONVERTERS = "calculetList/CALCULET_CONVERTERS"; // 단위 변환기

/** init State ( 초기 상태 ) */
const initialState = {
  // 단위 변환기(0)는 따로!
  // 0: {},
  // 수학(1) ~ 기타(99999)
  //   ...,
  //   99999: {
  //     99999: [
  //       {
  //         id: "",
  //         title: "",
  //         description: "",
  //         categoryMainId: 0,
  //         categorySubId: 0,
  //         viewCnt: 0,
  //         contributor: {
  //           userName: "",
  //           profileImgSrc: "",
  //         },
  //       },
  //     ],
  //   },
  // 99999: {},
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onSetCalculetList(data) {
  return { type: CALCULET_LIST, data };
}
export function onSetCalculetConverters(data) {
  return { type: CALCULET_CONVERTERS, data };
}

/** reducer정의 */
function calculetList(state = initialState, action) {
  switch (action.type) {
    case CALCULET_LIST:
      return {
        ...state,
        ...action.data,
      };
    case CALCULET_CONVERTERS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
export default calculetList;
