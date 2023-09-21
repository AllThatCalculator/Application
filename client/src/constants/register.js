// input id : 변수명
const ID_INPUT_TITLE = "inputTitle";
const ID_INPUT_DESCRIPTION = "inputDescription";
const ID_INPUT_CATEGORY_MAIN_ID = "inputCategoryMainId";
const ID_INPUT_CATEGORY_SUB_ID = "inputCategorySubId";
const ID_INPUT_SRC_CODE = "inputSrcCode";
const ID_INPUT_MANUAL = "inputManual";
const ID_INPUT_UPDATE_LOG = "inputUpdateLog";

// 업데이트 로그 글자 수 제한
const LIMIT_UPDATE_LOG = 100;

// 계산기 등록 : 정보 입력하기 | 계산기 만들기 | 설명 입력하기
const ID_SELECT_REGISTER_INFO = "selectRegisterInfo";

// 계산기 소스코드 기본값
const DEFAULT_VALUE_INPUT_SRC_CODE = `// 사용자 함수 예시
function main(inputObj){
  return outputObj;
}
`;
// const DEFAULT_VALUE_INPUT_SRC_CODE = `<!DOCTYPE html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>계산기 이름</title>\n</head>\n<body>\n  <h1>본인이 구현한 계산기 코드를 작성해주세요.</h1>\n  <input id="input" type="text" class="atc-input atc-calculet-input" atcDesc="입력" value="입력 예시"/>\n  <div id="output" class="atc-output atc-calculet-output" atcDesc="결과">결과 예시</div>\n  <button id="button" class="atc-button">버튼 예시</button>\n</body>\n</html>`;

// 계산기 편집창 높이
const EDITOR_HEIGHT_MIN = 1;
const EDITOR_HEIGHT_MAX = 100000;

// Define Drag Types -> drag & drop 을 위함
const EDITOR_ITEM_TYPES = {
  EDITOR: "editor",
};

// editor language
const SRC_CODE_LANGUAGES = "javascript";

// sidebar width
const DRAWER_WIDTH = 420;
// playground width
const PLAYGROUND_WIDTH = `calc(100% - ${DRAWER_WIDTH}px)`;

// component editor height
const HEIGHT_COMP_EDITOR = 360;
const MIN_HEIGHT_COMP_EDITOR = 148;
const MAX_HEIGHT_COMP_EDITOR = 700;

export {
  ID_INPUT_TITLE,
  ID_INPUT_DESCRIPTION,
  ID_INPUT_CATEGORY_MAIN_ID,
  ID_INPUT_CATEGORY_SUB_ID,
  ID_INPUT_SRC_CODE,
  ID_INPUT_MANUAL,
  ID_INPUT_UPDATE_LOG,
  ID_SELECT_REGISTER_INFO,
  DEFAULT_VALUE_INPUT_SRC_CODE,
  EDITOR_HEIGHT_MIN,
  EDITOR_HEIGHT_MAX,
  EDITOR_ITEM_TYPES,
  SRC_CODE_LANGUAGES,
  DRAWER_WIDTH,
  PLAYGROUND_WIDTH,
  HEIGHT_COMP_EDITOR,
  LIMIT_UPDATE_LOG,
  MIN_HEIGHT_COMP_EDITOR,
  MAX_HEIGHT_COMP_EDITOR,
};
