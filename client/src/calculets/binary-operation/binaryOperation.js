const input = document.querySelector("#input");
const output = document.querySelector("#output");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

/**
 * 2, 8, 16진수 -> 10진수
 * @param {string, string}
 * from: 바꿀 진수
 * input: 입력 값
 */
function changeToDecimal(from, input) {
  from = parseInt(from);
  input = parseInt(input);
  let p = 1;
  let output = 0;
  while (input) {
    const num = input % 10;
    if (num >= from) {
      return "식이 올바르지 않음.";
    }
    output += num * p;
    p *= from;
    input = Math.floor(input / 10);
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
    output += input % to;
    input = Math.floor(input / to);
  }
  return output.split("").reverse().join("");
}

/**
 * 구현 해야 함.
 * 2, 16 -> 8진수
 * 8, 16 -> 2진수
 * 2, 8 -> 16진수
 */

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
function onClick() {
  if (_to === "10") {
    output.value = changeToDecimal(_from, input.value).toString();
  } else if (_from === "10") {
    output.value = changeFromDecimal(_to, input.value).toString();
  }
}

function onKeyEvent(event) {
  if (event.key === "Enter") {
    if (_to === "10") {
      output.value = changeToDecimal(_from, input.value).toString();
    } else if (_from === "10") {
      output.value = changeFromDecimal(_to, input.value).toString();
    }
  }
}

btn.addEventListener("click", onClick);
input.addEventListener("keypress", onKeyEvent);
