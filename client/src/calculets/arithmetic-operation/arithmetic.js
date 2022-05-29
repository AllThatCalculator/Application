//연산자(+, -, *, /), 한 번에 검사하기 위해 set으로 묶음
const operator = new Set(["+", "-", "*", "/"]);
//여는 괄호, 종류가 여러 개므로 한 번에 검사하기 위해 set으로 묶음
const openBracket = new Set(["(", "{", "["]);
//닫는 괄호, 종류가 여러 개므로 한 번에 검사하기 위해 set으로 묶음
const closeBracket = new Set([")", "}", "]"]);
//후위 표기식 변환 시 필요한 연산자 우선순위 (key: 연산자, value: 우선순위)
const priority = new Map([
  ["*", 1],
  ["/", 1],
  ["+", 2],
  ["-", 2],
  ["(", 3],
  [")", 3],
]);
//올바른 괄호 쌍 검사 시 사용할 괄호쌍 (key: 닫는 괄호, value: 여는 괄호)
const bracket = new Map([
  [")", "("],
  ["}", "{"],
  ["]", "["],
]);

/**
 * 입력식이 유효한지 검사하는 함수
 * @param {string} input
 * @returns boolean
 */
function validate(input) {
  const len = input.length;
  //길이 0이거나 '.'있으면
  if (len === 0 || input.includes(".")) {
    return false;
  }
  const first = input[0];
  //처음이 숫자도 아니고, + or - 연산자도 아니고, 여는 괄호도 아닐 경우
  if (
    isNaN(first) &&
    first !== "+" &&
    first !== "-" &&
    !openBracket.has(first)
  ) {
    return false;
  }
  //마지막 문자가 연산자인 경우
  if (operator.has(input[len - 1])) {
    return false;
  }

  //현재까지 검사한 원소가 수인지 true / false 저장
  let isNumber = !(first === "+" || first === "-");
  //처음 시작인지 true / false 저장 (괄호 안의 식 처리하기 위해)
  let isFirst = openBracket.has(first);
  //올바른 괄호쌍 검사하기 위한 스택
  const stack = [];
  if (isFirst) {
    stack.push(first);
  }
  for (let i = 1; i < len; i++) {
    const x = input[i];
    //여는 괄호 -> 스택에 넣음
    if (openBracket.has(x)) {
      isFirst = true;
      isNumber = false;
      stack.push(x);
      continue;
    }
    //닫는 괄호
    else if (closeBracket.has(x)) {
      //연산자 + 닫는 괄호 -> 유효하지 않은 식
      if (!isNumber) {
        return false;
      }
      //닫는 괄호 뒤에 연산자 와야 하므로 isNumber = true로 설정
      isNumber = true;
      //올바른 괄호쌍 확인
      if (stack.length === 0 || stack[stack.length - 1] !== bracket.get(x)) {
        return false;
      }
      stack.pop();
    }
    //연산자
    else if (operator.has(x)) {
      //첫 시작인 경우 + or - 연산자 가능
      if (isFirst && (x === "-" || x === "+")) {
        isNumber = false;
        isFirst = false;
        continue;
      }
      //연산자 + 연산자 -> 유효하지 않은 식
      if (!isNumber) {
        return false;
      }
      isNumber = false;
    }
    //숫자
    else if (!isNaN(x)) {
      //그 전 값이 닫는 괄호면 -> 유효하지 않은 식
      if (closeBracket.has(input[i - 1])) {
        return false;
      }
      isNumber = true;
    }
    //그 외의 다른 문자
    else {
      return false;
    }
    isFirst = false;
  }
  if (stack.length) {
    return false;
  }
  return true;
}

/**
 * 유효한 입력식 파싱하는 함수
 * @param {string} input
 * @returns array
 */
function parsing(input) {
  //파싱한 결과 저장하는 배열
  const parsingResult = [];
  //괄호 관리하기 위해 식의 첫 시작 관리
  let isFirst = true;
  //숫자 문자 연결하는 문자열. 나중에 int형으로 바꿔서 parsingResult에 넣음
  let number = "";
  //음수, 양수 관리하는 변수
  let isMinus = false;
  let isPlus = false;

  for (let i = 0; i < input.length; i++) {
    const x = input[i];
    if (isFirst && x === "-") {
      isMinus = true;
      isFirst = false;
      continue;
    }
    if (isFirst && x === "+") {
      isPlus = true;
      isFirst = false;
      continue;
    }
    isFirst = false;

    //숫자
    if (!isNaN(x)) {
      number += x;
      continue;
    }
    //숫자 x
    //수 채운 문자열이 채워져 있다면 -> 수로 바꿈
    if (number.length) {
      let num = parseInt(number);
      if (isMinus) {
        num *= -1;
        isMinus = false;
      }
      if (isPlus) {
        isPlus = false;
      }
      parsingResult.push(num);
      number = "";
    }
    //여는 괄호
    if (openBracket.has(x)) {
      if (isMinus || isPlus) {
        if (isMinus) {
          isMinus = false;
          parsingResult.push(-1);
        } else {
          isPlus = false;
          parsingResult.push(1);
        }
        parsingResult.push("*");
      }
      //곱하기 생략된 경우 처리
      if (i > 0 && (!isNaN(input[i - 1]) || closeBracket.has(input[i - 1]))) {
        parsingResult.push("*");
      }
      isFirst = true;
      //소괄호로 통일
      parsingResult.push("(");
      continue;
    }
    //닫는 괄호
    else if (closeBracket.has(x)) {
      //소괄호로 통일
      parsingResult.push(")");
    }
    //연산자
    else {
      parsingResult.push(x);
    }
    isFirst = false;
  }
  //마지막에 숫자 남았다면
  if (number.length) {
    let num = parseInt(number);
    if (isMinus) {
      num *= -1;
      isMinus = false;
    }
    if (isPlus) {
      isPlus = false;
    }
    parsingResult.push(num);
    number = "";
  }
  return parsingResult;
}

/**
 * 두 수 받아서 사칙연산한 결과 돌려주는 함수
 * @param {*} first
 * @param {*} second
 * @param {*} op
 * @returns int
 */
function arithmeticOperation(first, second, op) {
  if (op === "+") {
    return first + second;
  } else if (op === "-") {
    return second - first;
  } else if (op === "*") {
    return first * second;
  } else if (op === "/") {
    return second / first;
  }
}

/**
 * 후위 표기식 계산하는 함수
 * @param {*} postfixNotation
 * @returns int
 */
function postfixNotationCalculate(postfixNotation) {
  const stack = [];
  for (let i = 0; i < postfixNotation.length; i++) {
    const x = postfixNotation[i];
    //x가 숫자라면
    if (!isNaN(x)) {
      stack.push(x);
      continue;
    }
    const first = stack.pop();
    const second = stack.pop();
    stack.push(arithmeticOperation(first, second, x));
  }
  return stack.pop();
}

/**
 * 후위 표기식으로 변환하는 함수
 * @param {*} expression
 * @returns array
 */
function changePostfixNotation(expression) {
  const postfixNotation = [];
  const stack = [];
  for (let i = 0; i < expression.length; i++) {
    const x = expression[i];
    //여는 괄호면 스택에 넣기
    if (x === "(") {
      stack.push(x);
    }
    //닫는 괄호면 스택에서 연산자 빼오기
    else if (x === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        postfixNotation.push(stack.pop());
      }
      stack.pop();
    } else if (operator.has(x)) {
      while (
        stack.length &&
        priority.get(x) >= priority.get(stack[stack.length - 1])
      ) {
        postfixNotation.push(stack.pop());
      }
      stack.push(x);
    } else {
      postfixNotation.push(x);
    }
  }
  while (stack.length) {
    postfixNotation.push(stack.pop());
  }
  return postfixNotation;
}

/**
 * 후위 표기식으로 변환해서 계산하는 함수
 * @param {*} expression
 * @returns int
 */
function calculate(expression) {
  console.log(expression);
  //후위 표기식 변환
  const postfixNotation = changePostfixNotation(expression);
  console.log(postfixNotation);
  //후위 표기식 연산
  return postfixNotationCalculate(postfixNotation);
}

/**
 * 메인 함수
 * @param {*} input
 * @returns int
 */
function main(input) {
  const isValid = validate(input);
  console.log(isValid);
  //식이 유효하지 않음
  if (!isValid) {
    return false;
  }
  const result = parsing(input);
  const output = calculate(result);
  console.log(output);
  return output;
}

const inputBox = document.querySelector("#input");
const outputBox = document.querySelector("#output");
const enterBtn = document.querySelector("#enter-button");
const errorMsg = "올바른 식을 입력해주세요.";

/**
 * 엔터 키 눌렀을 때 입력 받은 수식을 계산한 결과값 얻어서 result 박스에 보여주는 함수
 * @param {*} event
 */
function onKeyEvent(event) {
  if (event.key == "Enter") {
    const output = main(inputBox.value);
    if (output === false) {
      outputBox.value = errorMsg;
    } else {
      outputBox.value = output;
    }
    inputBox.value = "";
  }
}

/**
 * 엔터 버튼 눌렀을 때 입력 받은 수식을 계산한 결과값 얻어서 result 박스에 보여주는 함수
 * @param {*} event
 */
function onClickEvent(event) {
  const output = main(inputBox.value);
  if (output === false) {
    outputBox.value = errorMsg;
  } else {
    outputBox.value = output;
  }
  inputBox.value = "";
}

inputBox.addEventListener("keypress", onKeyEvent);
enterBtn.addEventListener("click", onClickEvent);

const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const multiplyBtn = document.querySelector("#multiply");
const divisionBtn = document.querySelector("#division");
const bracketOpenBtn = document.querySelector("#bracket-open");
const bracketCloseBtn = document.querySelector("#bracket-close");

/**
 * 연산자 버튼 눌렀을 때 연산자가 input 박스에 써지도록 하는 함수
 */
function onPlusEvent() {
  inputBox.value = `${inputBox.value}+`;
  inputBox.focus();
}
function onMinusEvent() {
  inputBox.value = `${inputBox.value}-`;
  inputBox.focus();
}
function onMultiplyEvent() {
  inputBox.value = `${inputBox.value}*`;
  inputBox.focus();
}
function onDivisionEvent() {
  inputBox.value = `${inputBox.value}/`;
  inputBox.focus();
}
function onBracketOpenEvent() {
  inputBox.value = `${inputBox.value}(`;
  inputBox.focus();
}
function onBracketCloseEvent() {
  inputBox.value = `${inputBox.value})`;
  inputBox.focus();
}

plusBtn.addEventListener("click", onPlusEvent);
minusBtn.addEventListener("click", onMinusEvent);
multiplyBtn.addEventListener("click", onMultiplyEvent);
divisionBtn.addEventListener("click", onDivisionEvent);
bracketOpenBtn.addEventListener("click", onBracketOpenEvent);
bracketCloseBtn.addEventListener("click", onBracketCloseEvent);
