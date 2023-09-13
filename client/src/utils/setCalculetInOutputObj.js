import { v4 as uuidv4 } from "uuid";
const KEY_INPUT = "atc-calculet-input";
const KEY_OUTPUT = "atc-calculet-output";

/**
 * iframe내의 태그를 찾아서 id와 description 반환해주는 함수
 * @param {string} className: iframe내에 찾고자 하는 클래스 네임
 * @param {string} objectName: 해당하는 object key
 * @returns id 목록과 id-desctiption object
 */
function approachIframeTag(className, objectName) {
  const iframe = document.querySelector("iframe#calculetIframe").contentWindow
    .document.body;

  const calculetObj = {
    [objectName]: [], // id 목록
    labelDict: {}, // id를 키로, description을 수집한다.
  };

  for (const element of iframe.querySelectorAll(`.${className}`)) {
    // id가 존재하지 않는 경우 새 uuid 부과함
    if (!!!element.id) {
      element.id = uuidv4();
    }
    calculetObj[objectName].push(element.id);
    calculetObj.labelDict[element.id] = element.attributes.atcDesc.value;
  }

  return calculetObj;
}

/**
 * 계산기 정보 초기화
 * - inputObj: input tag의 id 목록
 * - outputObj: output tag의 id 목록
 * - labelDict: id - description 매핑 정보
 */
function setCalculetInOutputObj() {
  const { inputObj, labelDict: labelDictIn } = approachIframeTag(
    KEY_INPUT,
    "inputObj"
  );
  const { outputObj, labelDict: labelDictOut } = approachIframeTag(
    KEY_OUTPUT,
    "outputObj"
  );

  return {
    inputObj,
    outputObj,
    labelDict: { ...labelDictIn, ...labelDictOut },
  };
}

/**
 * id목록에 해당하는 값을 뽑아서 리턴함
 * @param {Array<string>} idList id 목록
 * @returns 각 id로 추출한 값을 매핑한 object
 */
function getValueFromIframe(idList) {
  const iframe = document.querySelector("iframe#calculetIframe").contentWindow
    .document;

  return idList.reduce((obj, id) => {
    const tag = iframe.getElementById(id);

    const value =
      (tag.value !== "" && tag.value) ||
      (tag.innerText !== "" && tag.innerText) ||
      (tag.innerHtml !== "" && tag.innerHtml);

    obj[id] = value !== undefined ? value : "";
    return obj;
  }, {});
}

/**
 * 입출력 값을 모아서 리턴하는 함수
 * @param {object} calculetObj 계산기 입출력 정보 - calculetRecord/calculetObj
 * @returns
 */
function getCalculetInOutputObj(calculetObj) {
  return {
    inputObj: getValueFromIframe(calculetObj.inputObj),
    outputObj: getValueFromIframe(calculetObj.outputObj),
  };
}

export { getCalculetInOutputObj, setCalculetInOutputObj };
