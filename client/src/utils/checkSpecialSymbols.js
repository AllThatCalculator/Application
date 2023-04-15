/**
 * 영어, 한글, 숫자, _ , - , ( , ) 제외한 다른 문자 있는지 검사
 * @param {*} value
 * @returns
 */
function checkSymbols(value) {
  let result = true;
  try {
    // \w : 영어, 숫자, _
    // \s : 공백문자(스페이스, 탭, 줄바꿈 등)
    // ㄱ-힣 : 한글
    // ()- : (, ), -
    const reg = /[^\w\sㄱ-힣()-]/g;
    result = reg.test(value);
  } catch (err) {
    result = false;
  }
  return result;
}

/**
 * 공백 있는지 검사
 * @param {} value
 * @returns
 */
function checkSpace(value) {
  let result = true;
  try {
    // 공백 여부
    const space = /\s/;
    result = value.search(space) !== -1;
  } catch (err) {
    result = false;
  }
  return result;
}

export { checkSymbols, checkSpace };
