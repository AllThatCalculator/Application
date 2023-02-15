const input = document.querySelector("#input");
const output = document.querySelector("#output");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

/**
 * 16진수에서 10이상인 수를 알파벳으로 바꿔주는 함수
 * @param {number}
 * value: 16진수에서 10 이상인 수
 * @returns 알파벳
 */
function changeHexaToAlpha(value) {
  // 아스키코드값을 문자열로 바꿔주는 함수
  return String.fromCharCode(value + 55);
}

/**
 * 16진수에서 알파벳을 숫자로 바꿔주는 함수
 * @param {string}
 * value: 16진수에서 알파벳
 * @returns 숫자
 */
function changeAlphaToHexa(value) {
  // 문자열.charCodeAt(자릿수): 문자열의 해당 자릿수의 값을 아스키코드로 바꿔주는 함수
  if (value.charCodeAt(0) >= 97) {
    return value.charCodeAt(0) - 87;
  }
  return value.charCodeAt(0) - 55;
}

/**
 * 2, 8, 16진수 -> 10진수
 * @param {string, string}
 * from: 바꿀 진수
 * input: 입력 값
 */
function changeToDecimal(from, input) {
  from = parseInt(from);
  let p = 1;
  let output = 0;
  for (let i = input.length - 1; i >= 0; i--) {
    let num = input[i];
    if (isNaN(num)) {
      num = changeAlphaToHexa(num);
      num = parseInt(num);
    }
    if (num >= from) {
      return "식이 올바르지 않음.";
    }
    output += num * p;
    p *= from;
  }
  return output;
}

/**
 * 10진수 -> 2, 8, 16진수
 * @param {string, string}
 * to: 바뀌는 진수
 * input: 입력 값
 */
function changeFromDecimal(to, input) {
  to = parseInt(to);
  input = parseInt(input);
  let output = "";
  while (input > 0) {
    let r = input % to;
    if (r >= 10) {
      r = changeHexaToAlpha(r);
    }
    output += r;
    input = Math.floor(input / to);
  }
  return output.split("").reverse().join("");
}

let _from = "";
let _to = "";
function onFromChange(event) {
  _from = event.target.value;
}
function onToChange(event) {
  _to = event.target.value;
}

from.addEventListener("change", onFromChange);
to.addEventListener("change", onToChange);

const btn = document.querySelector("#enter-button");

/**
 * 진수 변환기의 입력에 엔터버튼을 눌렀을 때 이벤트 함수
 * - 원하는 진수로 변환된 output값이 value에 바로 저장
 */
function onClick() {
  if (_to === "10") {
    output.value = changeToDecimal(_from, input.value).toString();
  } else if (_from === "10") {
    output.value = changeFromDecimal(_to, input.value).toString();
  } else {
    const temp = changeToDecimal(_from, input.value).toString();
    output.value = changeFromDecimal(_to, temp).toString();
  }
}

/**
 * 진수 변환기의 입력에 키보드 엔터를 눌렀을 때 이벤트 함수
 * - 원하는 진수로 변환된 output값이 value에 바로 저장
 */
function onKeyEvent(event) {
  if (event.key === "Enter") {
    // console.log(_from, _to);
    if (_to === "10") {
      output.value = changeToDecimal(_from, input.value).toString();
    } else if (_from === "10") {
      output.value = changeFromDecimal(_to, input.value).toString();
    } else {
      const temp = changeToDecimal(_from, input.value).toString();
      output.value = changeFromDecimal(_to, temp).toString();
    }
  }
}

btn.addEventListener("click", onClick);
input.addEventListener("keypress", onKeyEvent);
