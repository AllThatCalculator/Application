/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */

import {
  Common,
  Components,
} from "../components/organisms/register-editor/ComponentOptions";
import { PROPERTY_OPTION_START_NUMBER } from "../constants/calculetComponent";

const CALCULET_EDITOR_COMPONENTS_APPEND =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_APPEND";
const CALCULET_EDITOR_COMPONENTS_DELETE =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_DELETE";
const CALCULET_EDITOR_COMPONENTS_UPDATE =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_UPDATE";

/** init State ( 초기 상태 ) */
const initialState = {
  components: {},
  userFunction: (x) => x, // (임시)
};

/**
 * 액션 종류
 * 1. 새로운 컴포넌트 추가
 * 2. 컴포넌트 삭제
 * 3. 컴포넌트 정보 변경
 */

/** Action Creator Function ( 액션 생성 함수 ) */
export function onAppendNewComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_APPEND, data };
}
export function onDeleteComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_DELETE, data };
}
export function onUpdateComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_UPDATE, data };
}

/**
 * componentType에 맞는 새로운 컴포넌트 객체를 생성한다.
 * @param {*} data
 * @returns
 */
function createNewComponent(data) {
  const newComponent = { ...data };
  Object.entries({ ...Common, ...Components[data.componentType] }).map(
    ([key, value]) => {
      if (value.value !== undefined) {
        newComponent[key] = value.value;
      } else {
        newComponent[key] = null;
      }
      return null;
    }
  );

  if (newComponent.options) {
    newComponent.options = {
      [PROPERTY_OPTION_START_NUMBER]: {
        value: "default",
        label: "기본값",
      },
    };
  }

  return newComponent;
}

function calculetEditor(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case CALCULET_EDITOR_COMPONENTS_APPEND:
      return {
        ...state,
        components: {
          ...state.components,
          [data.componentId]: createNewComponent(data),
        },
      };
    case CALCULET_EDITOR_COMPONENTS_DELETE:
      const { [data.componentId]: target, ...rest } = state;
      return { ...state, components: rest };
    case CALCULET_EDITOR_COMPONENTS_UPDATE:
      return {
        ...state,
        components: {
          ...state.components,
          [data.componentId]: {
            ...state.components[data.componentId],
            [data.targetId]: data.value,
          },
        },
      };

    default:
      return state;
  }
}

export default calculetEditor;
