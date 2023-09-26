/**
 * Action type
 * Ducks 패턴을 사용할 때는 액션 타입을 선언할 때 문자열 앞에 접두사 붙임.
 * 다른 모듈과 이름이 중복되지 않게 하기 위함.
 */

import {
  Common,
  Components,
} from "../components/organisms/register-editor/ComponentOptions";
import {
  CALCULET_BUTTON,
  CHECK_BOX,
  DATE_PICKER,
  INPUT_HELPER,
  MULTI_CHECK_BOX,
  MULTI_SELECT,
  PROPERTY_OPTION_START_NUMBER,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_DATE,
  TYPOGRAPHY,
} from "../constants/calculetComponent";
import { DEFAULT_VALUE_INPUT_SRC_CODE } from "../constants/register";

const CALCULET_EDITOR_COMPONENTS_APPEND =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_APPEND";
const CALCULET_EDITOR_COMPONENT_DELETE =
  "calculetEditor/CALCULET_EDITOR_COMPONENT_DELETE";
const CALCULET_EDITOR_COMPONENTS_UPDATE =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_UPDATE";
const CALCULET_EDITOR_COMPONENTS_CLEAR =
  "calculetEditor/CALCULET_EDITOR_COMPONENTS_CLEAR";
const CALCULET_EDITOR_LAYOUT_UPDATE =
  "calculetEditor/CALCULET_EDITOR_LAYOUT_UPDATE";
const CALCULET_EDITOR_USER_FUNCTION_UPDATE =
  "calculetEditor/CALCULET_EDITOR_USER_FUNCTION_UPDATE";
const CALCULET_EDITOR_USER_COMPONENT_UPDATE =
  "calculetEditor/CALCULET_EDITOR_USER_COMPONENT_UPDATE";

/** init State ( 초기 상태 ) */
const initialState = {
  components: {},
  layout: [
    // editor 편집창 layout
    // { i: 1, x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1 }, // *** -- minH & maxH doesnt effect the grid items
  ],
  userFunction: DEFAULT_VALUE_INPUT_SRC_CODE, // 사용자 계산 함수
};

/**
 * 액션 종류
 * 1. 새로운 컴포넌트 추가
 * 2. 컴포넌트 삭제
 * 3. 컴포넌트 정보 변경
 */

/** Action Creator Function ( 액션 생성 함수 ) */
// component
export function onAppendNewComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_APPEND, data };
}
export function onUpdateComponent(data) {
  return { type: CALCULET_EDITOR_COMPONENTS_UPDATE, data };
}
export function onClearComponentLayout() {
  // delete all component, layout
  return { type: CALCULET_EDITOR_COMPONENTS_CLEAR };
}
export function onDeleteComponentLayout(data) {
  // delete in component, layout
  return { type: CALCULET_EDITOR_COMPONENT_DELETE, data };
}
// layout
export function onUpdateLayout(data) {
  return { type: CALCULET_EDITOR_LAYOUT_UPDATE, data };
}
// user function
export function onUpdateUserFunction(data) {
  return { type: CALCULET_EDITOR_USER_FUNCTION_UPDATE, data };
}
// all update at the same time
export function onUpdateUserComponent(data) {
  return { type: CALCULET_EDITOR_USER_COMPONENT_UPDATE, data };
}

/**
 * componentType에 맞는 새로운 컴포넌트 객체를 생성한다.
 * @param {*} data
 * @returns
 */
function createNewComponent(data) {
  const newComponent = { ...data };
  Object.entries({ ...Components[data.componentType] }).map(([key, value]) => {
    if (value.defaultValue !== undefined) {
      newComponent[key] = value.defaultValue;
    } else {
      newComponent[key] = null;
    }
    return null;
  });

  if (newComponent.options) {
    newComponent.options = {
      [PROPERTY_OPTION_START_NUMBER]: {
        value: "default",
        label: "기본값",
      },
    };
  }

  // defaultValue 초기화
  if (!newComponent.defaultValue) {
    let defaultValue = "";
    switch (newComponent.componentType) {
      case MULTI_SELECT:
        defaultValue = [];
        break;
      case CHECK_BOX:
      case PROPERTY_TYPE_BOOLEAN:
        defaultValue = false;
        break;
      case MULTI_CHECK_BOX:
        defaultValue = {};
        break;
      case DATE_PICKER:
      case PROPERTY_TYPE_DATE:
        defaultValue = null;
        break;
      default:
        defaultValue = "";
        break;
    }
    newComponent.defaultValue = defaultValue;
  }

  // isInput 초기화
  const type = String(newComponent.componentType);
  if (
    type !== TYPOGRAPHY &&
    type !== INPUT_HELPER &&
    type !== CALCULET_BUTTON
  ) {
    newComponent.isInput = true;
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
    case CALCULET_EDITOR_COMPONENT_DELETE:
      // comp
      const { [data.componentId]: target, ...compRest } = state.components;
      // layout
      let layout = [...state.layout];
      const deleteLayoutIdx = layout.findIndex(
        (value) => value.i === data.componentId
      );
      layout.splice(deleteLayoutIdx, 1);
      // console.log("layout>>>", layout);
      return { ...state, components: compRest, layout: layout };
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
    case CALCULET_EDITOR_COMPONENTS_CLEAR:
      return { ...state, components: {}, layout: [] };
    case CALCULET_EDITOR_LAYOUT_UPDATE:
      return {
        ...state,
        layout: data,
      };
    case CALCULET_EDITOR_USER_FUNCTION_UPDATE:
      return {
        ...state,
        userFunction: data,
      };
    case CALCULET_EDITOR_USER_COMPONENT_UPDATE:
      return {
        ...state,
        components: data.components,
        layout: data.layout,
        userFunction: data.userFunction,
      };

    default:
      return state;
  }
}

export default calculetEditor;
