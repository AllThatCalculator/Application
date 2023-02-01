/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
const CALCULET_CATEGORY = "calculetCategory/CALCULET_CATEGORY";

/** init State ( 초기 상태 ) */
const initialState = {
  main: [
    {
      value: 0,
      name: "",
      sub: [
        {
          value: 0,
          name: "",
        },
      ],
    },
    // {
    //     "value": 1,
    //     "name": "수학",
    //     "sub": [
    //       {
    //         "value": 0,
    //         "name": "단위 변환기"
    //       },
    //       {
    //         "value": 1,
    //         "name": "계산"
    //       },
    //       {
    //         "value": 2,
    //         "name": "통계"
    //       },
    //       {
    //         "value": 3,
    //         "name": "기하"
    //       },
    //       {
    //         "value": 99999,
    //         "name": "기타"
    //       }
    //     ]
    //   },
  ],
};

/** Action Creator Function ( 액션 생성 함수 ) */
export function onGetCalculetCategory(data) {
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
