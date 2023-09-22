import {
  CALCULET_BUTTON,
  CHECK_BOX,
  DATE_PICKER,
  FILE,
  INPUT_HELPER,
  MULTI_CHECK_BOX,
  MULTI_SELECT,
  RADIO,
  SELECT,
  TEXT_FIELD,
  TYPOGRAPHY,
} from "../../../constants/calculetComponent";

// editor sidebar에서 컴포넌트 제공 (기본값 포함)
const calculateButton = [
  {
    name: "계산하기 버튼",
    componentType: CALCULET_BUTTON,
    width: "fit-content",
  },
];
const text = [
  {
    name: "텍스트",
    componentType: TYPOGRAPHY,
    variant: "h5",
    content: "제목",
    width: "fit-content",
  },
];
// const file = [{ name: "파일", componentType: FILE }];
const textField = [
  {
    name: "입력창",
    componentType: TEXT_FIELD,
    label: "입력창",
    value: "123",
  },
  {
    name: "날짜 선택기",
    componentType: DATE_PICKER,
    label: "날짜 선택기",
    value: null,
  },
  // { name: "주소", componentType: ADDRESS },
];
const checkbox = [
  {
    name: "체크 박스",
    componentType: CHECK_BOX,
    value: true,
    width: "fit-content",
  },
];
const inputHelper = [
  {
    name: "버튼 도우미",
    componentType: INPUT_HELPER,
    options: {
      0: { label: "+" },
      1: { label: "-" },
      2: { label: "÷" },
      3: { label: "x" },
    },
    width: "fit-content",
  },
];
const select = [
  {
    name: "선택창",
    componentType: SELECT,
    label: "단일 선택창",
    value: "0",
    options: {
      0: {
        label: "빨강",
        value: "0",
      },
    },
  },
  {
    name: "라디오",
    componentType: RADIO,
    value: "1",
    options: {
      0: {
        label: "예",
        value: "1",
      },
      1: {
        label: "아니오",
        value: "0",
      },
    },
    width: "fit-content",
  },
];
const multiselect = [
  {
    name: "선택창",
    componentType: MULTI_SELECT,
    label: "다중 선택창",
    value: ["0", "1"],
    options: {
      0: {
        label: "액션",
        value: "0",
      },
      1: {
        label: "코미디",
        value: "1",
      },
    },
  },
  {
    name: "체크 박스",
    componentType: MULTI_CHECK_BOX,
    value: ["0", "1"],
    options: {
      0: {
        label: "오렌지",
        value: "0",
      },
      1: {
        label: "아보카도",
        value: "1",
      },
      2: { label: "고구마" },
    },
    width: "fit-content",
  },
];

// 각 type
//    ㄴ title, components
//               ㄴ id, name, component
const editorComponentList = {
  calculate: {
    title: "계산하기 버튼",
    help: "계산하기 버튼은 필수로 1개 들어가야 합니다.",
    components: calculateButton,
  },
  text: { title: "텍스트", components: text },
  // file: { title: "파일", components: file },
  textField: { title: "글자 입력창", components: textField },
  checkbox: { title: "체크 박스", components: checkbox },
  inputHelper: { title: "도우미", components: inputHelper },
  select: { title: "단일 선택", components: select },
  multiselect: { title: "다중 선택", components: multiselect },
};

export default editorComponentList;
