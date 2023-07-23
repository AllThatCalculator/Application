/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */
// 실제 계산 블록에서 사용할 패턴!!
import {
  Common,
  Components,
} from "../components/organisms/register-editor/ComponentOptions";

const CALCULET_EDITOR_COMPONENTS = "calculetEditor/CALCULET_EDITOR_COMPONENTS";
const CALCULET_EDITOR_COMPONENTS_APPEND =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_APPEND";
const CALCULET_EDITOR_COMPONENTS_DELETE =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_DELETE";
const CALCULET_EDITOR_COMPONENTS_UPDATE =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_UPDATE";
const CALCULET_EDITOR_CALCULATE = "calculetEditor/CALCULET_EDITOR_CALCULATE";
/** init State ( 초기 상태 ) */
const initialState = {
  components: {},
  userFunction: new Function(),
};

const example = {
  someuuid: {
    componentId: "someuuid",
    value: "",
    InputProps,
  },
};
/**
 * 액션 종류
 * 1. 새로운 컴포넌트 추가
 * 2. 컴포넌트 삭제
 * 3. 컴포넌트 정보 변경
 * 4. 계산하기
 */

/** Action Creator Function ( 액션 생성 함수 ) */
function onAppendNewComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_APPEND, data };
}
function onDeleteComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_DELETE, data };
}
function onUpdateComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_UPDATE, data };
}
function onCalculate(data) {
  return {
    type: CALCULET_EDITOR_CALCULATE,
    data,
  };
}

function calculetEditor(state = initialState, action) {
  switch (action.type) {
    case CALCULET_EDITOR_COMPONENTS_APPEND:
      const newComponent = {};
      Object.entries({ ...Common, ...Components[data.type] }).map(
        ([key, value]) => {
          newComponent[key] = value.required ? "" : null;
        }
      );

      return {
        ...state,
        [data.componentId]: newComponent,
      };
    case CALCULET_EDITOR_COMPONENTS_DELETE:
      const { [data.componentId]: target, ...rest } = state;
      return rest;
    case CALCULET_EDITOR_COMPONENTS_UPDATE:
      return state;
  }
}
