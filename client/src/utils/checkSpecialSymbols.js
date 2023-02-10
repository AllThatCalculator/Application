// 공백 혹은 특수문자 검사
function checkSpecialSymbols(value) {
  var result = true;
  try {
    // 영어, 한글, 숫자 제외한 다른 문자 확인
    let reg = /[^\w\sㄱ-힣()0-9 ]/g;
    // 공백 여부
    let space = /\s/;

    result = reg.test(value) || value.search(space) !== -1;
  } catch (err) {
    result = false;
  }
  return result;
}

export default checkSpecialSymbols;
