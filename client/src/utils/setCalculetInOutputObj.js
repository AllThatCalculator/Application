const KEY_INPUT = "atc-calculet-input";
const KEY_OUTPUT = "atc-calculet-output";

/**
 * iframe내의 태그를 찾아서 반환해주는 함수
 * @param {string}
 * className: iframe내에 찾고자 하는 클래스 네임
 * @returns 태그 배열
 */
function approachIframeTag(className) {
  return window.frames[0].document.querySelectorAll(`.${className}`);
}

/**
 * 태그 리스트 내의 값에 접근해서 object로 가공시키는 함수
 * @param {nodelist} data 태그 리스트
 * @returns object
 */
function makeObject(data) {
  const obj = {};
  for (let i = 0; i < data.length; i++) {
    const desc = data[i].attributes.atcDesc.value;
    const value = data[i].value;
    obj[desc] = value;
  }
  return obj;
}
function getCalculetObj(tagName) {
  const tag = approachIframeTag(tagName);
  const obj = makeObject(tag);
  return obj;
}

function setCalculetInOutputObj(id, handleSetCalculetObj) {
  handleSetCalculetObj({
    calculetId: id,
    inputObj: getCalculetObj(KEY_INPUT),
    outputObj: getCalculetObj(KEY_OUTPUT),
  });
}
export default setCalculetInOutputObj;
