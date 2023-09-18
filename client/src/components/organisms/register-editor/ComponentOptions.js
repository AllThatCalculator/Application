import {
  PROPERTY_TYPE_STRING,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_SELECT,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_OBJECT,
} from "../../../constants/calculetComponent";

/**
 * 컴포넌트들에 공통으로 쓰이는 속성 (예외: typographpy, calculet_button)
 * key : 속성 이름 (mui에서 쓰이는 속성 이름과 동일)
 * value :
 *   - type : PROPERTY_TYPE_STRING - text field, PROPERTY_TYPE_BOOLEAN - checkbox, PROPERTY_TYPE_SELECT - select box
 *   - defaultValue : 기본값
 *   - label : 페이지에 표시되는 이름
 *   - required : 필수로 입력되어야 하는 속성인지
 *   - options : select box에 표시되는 옵션들
 *     - value : 옵션 id (mui에 넘어갈 value)
 *     - label : 페이지에 표시되는 이름
 */
const Common = {
  id: {
    componentType: PROPERTY_TYPE_STRING,
    label: "변수명",
    defaultValue: "",
    required: true,
  },
  label: {
    componentType: PROPERTY_TYPE_STRING,
    label: "설명",
    defaultValue: "",
    required: true,
  },
};

/**
 * 컴포넌트에 자주 쓰이는 속성
 */
const SemiCommon = {
  required: {
    componentType: PROPERTY_TYPE_BOOLEAN,
    label: "필수 여부",
    defaultValue: false,
    required: false,
  },
  disabled: {
    componentType: PROPERTY_TYPE_BOOLEAN,
    label: "비활성화",
    defaultValue: false,
    required: false,
  },
  options: {
    componentType: PROPERTY_TYPE_OBJECT,
    label: "옵션",
    defaultValue: {},
    required: true,
  },
};

/**
 * 옵션이 있는 컴포넌트의 옵션에 대한 속성 정보
 */
const Option = {
  value: {
    componentType: PROPERTY_TYPE_STRING,
    label: "value",
    defaultValue: "",
    required: true,
  },
  label: {
    componentType: PROPERTY_TYPE_STRING,
    label: "label",
    defaultValue: "",
    required: true,
  },
};

/**
 * 텍스트 입력 컴포넌트에 들어가는 공통 속성 정보
 */
const TextOption = {
  isInput: {
    componentType: PROPERTY_TYPE_BOOLEAN,
    label: "입력 여부",
    defaultValue: true,
    required: false,
  },
  isOutput: {
    componentType: PROPERTY_TYPE_BOOLEAN,
    label: "출력 여부",
    defaultValue: false,
    required: false,
  },
  copyButton: {
    componentType: PROPERTY_TYPE_BOOLEAN,
    label: "복사 버튼",
    defaultValue: false,
    required: false,
  },
};

/**
 * 컴포넌트 속성들에 대한 정보를 담은 객체
 */
const Components = {
  typography: {
    variant: {
      componentType: PROPERTY_TYPE_SELECT,
      label: "종류",
      options: [
        { value: "body1", label: "본문 1" },
        { value: "body2", label: "본문 2" },
        { value: "button", label: "굵은 글씨" },
        { value: "caption", label: "설명 글씨" },
        { value: "h1", label: "제목 1" },
        { value: "h2", label: "제목 2" },
        { value: "h3", label: "제목 3" },
        { value: "h4", label: "제목 4" },
        { value: "h5", label: "제목 5" },
        { value: "h6", label: "제목 6" },
        { value: "overline", label: "얇은 글씨" },
        { value: "subtitle1", label: "소제목 1" },
        { value: "subtitle2", label: "소제목 2" },
        { value: "string", label: "텍스트" },
      ],
      required: false,
      defaultValue: "body1",
    },
    content: {
      componentType: PROPERTY_TYPE_STRING,
      label: "내용",
      defaultValue: "",
      required: false,
    },
  },
  textField: {
    ...Common,
    required: SemiCommon.required,
    disabled: SemiCommon.disabled,
    ...TextOption,
    type: {
      componentType: PROPERTY_TYPE_SELECT,
      label: "타입",
      options: [
        { value: "text", label: "문자열" },
        { value: "email", label: "이메일" },
        { value: "tel", label: "전화번호" },
        { value: "number", label: "숫자" },
        { value: "password", label: "비밀번호" },
      ],
      required: false,
      defaultValue: "text",
    },
    placeholder: {
      componentType: PROPERTY_TYPE_STRING,
      label: "placeholder",
      defaultValue: "",
      required: false,
    },
    defaultValue: {
      componentType: PROPERTY_TYPE_STRING,
      label: "기본값",
      defaultValue: "",
      required: false,
    },
  },
  datePicker: {
    ...Common,
    disabled: SemiCommon.disabled,
    defaultValue: {
      componentType: PROPERTY_TYPE_DATE,
      label: "기본값",
      defaultValue: null,
      required: false,
    },
  },
  select: {
    ...Common,
    disabled: SemiCommon.disabled,
    options: SemiCommon.options,
  },
  multiSelect: {
    ...Common,
    disabled: SemiCommon.disabled,
    options: SemiCommon.options,
  },
  checkbox: {
    ...Common,
    required: SemiCommon.required,
    disabled: SemiCommon.disabled,
    defaultValue: {
      componentType: PROPERTY_TYPE_BOOLEAN,
      label: "체크 여부",
      defaultValue: false,
      required: false,
    },
  },
  multiCheckbox: {
    ...Common,
    required: SemiCommon.required,
    disabled: SemiCommon.disabled,
    options: SemiCommon.options,
  },
  radio: {
    ...Common,
    required: SemiCommon.required,
    disabled: SemiCommon.disabled,
    options: SemiCommon.options,
  },
  inputHelper: {
    ...Common,
    target: {
      componentType: PROPERTY_TYPE_STRING,
      label: "입력될 입력창의 변수명",
      defaultValue: "",
      required: true,
    },
    options: SemiCommon.options,
  },
  calculetButton: {},
};

export { Common, Option, Components };
