const input = document.querySelector("#input");
const output = document.querySelector("#output");
const from = document.querySelector("#from");
const to = document.querySelector("#to");

/**
 * 2진수 -> 10진수
 * @param {string} input
 */
function binaryToDecimal(input) {
  input = parseInt(input);
  let p = 1;
  let output = 0;
  while (input) {
    const num = input % 10;
    if (num > 1) {
      return "식이 올바르지 않음.";
    }
    output += num * p;
    p *= 2;
    input = parseInt(input / 10);
  }
  return output;
}

/**
 * 10진수 -> 2진수
 * @param {string} input
 */
function decimalToBinary(input) {
  input = parseInt(input);
  let output = "";
  while (input > 0) {
    output += input % 2;
    input = parseInt(input / 2);
  }
  return output.split("").reverse().join("");
}

/**
 * 2진수 -> 16진수
 * @param {string} input
 */
function binaryToHexa(input) {}

/**
 * 16진수 -> 2진수
 * @param {string} input
 */
function hexaToBinary(input) {}

/**
 * 10진수 -> 16진수
 * @param {string} input
 */
function decimalToHexa(input) {}

/**
 * 16진수 -> 10진수
 * @param {string} input
 */
function hexaToDecimal(input) {}

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
  console.log(_from, _to);
  if (_from === "from_binary" && _to === "to_decimal") {
    output.value = binaryToDecimal(input.value).toString();
  } else if (_from === "from_decimal" && _to === "to_binary") {
    output.value = decimalToBinary(input.value).toString();
  }
}

function onKeyEvent(event) {
  if (event.key == "Enter") {
    if (_from === "from_binary" && _to === "to_decimal") {
      output.value = binaryToDecimal(input.value).toString();
    }
  }
}

btn.addEventListener("click", onClick);
input.addEventListener("keypress", onKeyEvent);
