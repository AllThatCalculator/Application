const operator = new Set(["+", "-", "*", "/"]); //+,-,*,/
const openBracket = new Set(["(", "{", "["]); //여는 괄호
const closeBracket = new Set([")", "}", "]"]); //닫는 괄호
//후위 표기식 변환 시 필요한 연산자 우선순위
const priority = new Map([
  ["*", 1],
  ["/", 1],
  ["+", 2],
  ["-", 2],
  ["(", 3],
  [")", 3],
]);
//닫는 괄호에 대해 여는 괄호 쌍 map에 저장
const bracket = new Map([
  [")", "("],
  ["}", "{"],
  ["]", "["],
]);

//입력식이 유효한지 검사

/**
 * hello this is a sample comment
 * @param {string} input
 * @returns boolean
 */
function isValid(input) {
  const len = input.length;
  if (len === 0 || input.includes(".")) {
    //길이 0이거나 '.'있으면
    return false;
  }
  const first = input[0];
  if (first === "*" || first === "/" || closeBracket.has(first)) {
    //앞에 연산자
    return false;
  }
  if (operator.has(input[len - 1])) {
    //마지막 문자가 연산자
    return false;
  }
  if (isNaN(first) && !operator.has(first) && !openBracket.has(first)) {
    return false;
  }

  let isNumber = !(first === "+" || first === "-");
  let isFirst = openBracket.has(first);
  const stack = []; //올바른 괄호쌍 검사
  if (isFirst) {
    stack.push(first);
  }
  for (let i = 1; i < len; i++) {
    const x = input[i];
    //여는 괄호
    if (openBracket.has(x)) {
      isFirst = true;
      stack.push(x);
      continue;
    }
    //닫는 괄호 뒤에 무조건 연산자 와야하는걸!
    else if (closeBracket.has(x)) {
      if (!isNumber) {
        return false;
      }
      isNumber = true;
      if (stack.length === 0 || stack[stack.length - 1] !== bracket.get(x)) {
        return false;
      }
      stack.pop();
    }
    //연산자
    else if (operator.has(x)) {
      if (isFirst && (x === "-" || x === "+")) {
        isNumber = false;
        isFirst = false;
        continue;
      }
      if (!isNumber) {
        return false;
      }
      isNumber = false;
    }
    //숫자
    else if (!isNaN(x)) {
      //그 전 값이 닫는 괄호면 -> 유효한 식 x
      if (closeBracket.has(input[i - 1])) {
        return false;
      }
      isNumber = true;
    } else {
      return false;
    }
    isFirst = false;
  }
  if (stack.length) {
    return false;
  }
  return true;
}

//입력식 파싱하는 함수
function parsing(input) {
  const parsingResult = [];
  let isFirst = false;
  let number = "";
  let isMinus = false;
  let isPlus = false;

  const first = input[0];
  if (first === "-") {
    isMinus = true;
  } else if (first === "+") {
    isPlus = true;
  } else if (openBracket.has(first)) {
    //여는 괄호
    parsingResult.push("("); //소괄호 통일
    isFirst = true;
  } else {
    number += first;
  }

  for (let i = 1; i < input.length; i++) {
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

    if (!isNaN(x)) {
      //숫자라면
      number += x;
      continue;
    }
    //숫자 x
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
      if (!isNaN(input[i - 1]) || closeBracket.has(input[i - 1])) {
        parsingResult.push("*");
      }
      isFirst = true;
      parsingResult.push("("); //소괄호로 통일
      continue;
    } else if (closeBracket.has(x)) {
      parsingResult.push(")"); //소괄호로 통일
    } else {
      //연산 기호
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

//두 수 받아서 사칙연산한 결과 돌려주는 함수
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

//후위 표기식 계산하는 함수
function postfixNotationCalculate(postfixNotation) {
  const stack = [];
  for (let i = 0; i < postfixNotation.length; i++) {
    const x = postfixNotation[i];
    if (!isNaN(x)) {
      //x가 숫자라면
      stack.push(x);
      continue;
    }
    const first = stack.pop();
    const second = stack.pop();
    stack.push(arithmeticOperation(first, second, x));
  }
  return stack.pop();
}

//후위 표기식으로 변환하는 함수
function changePostfixNotation(expression) {
  const postfixNotation = [];
  const stack = [];
  for (let i = 0; i < expression.length; i++) {
    const x = expression[i];
    if (x === "(") {
      //여는 괄호면 스택에 넣기
      stack.push(x);
    } else if (x === ")") {
      //닫는 괄호면 스택에서 연산자 빼오기
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

//후위 표기식으로 변환해서 계산하는 함수
function calculate(expression) {
  console.log(expression);
  const postfixNotation = changePostfixNotation(expression); //후위 표기식 변환
  console.log(postfixNotation);
  return postfixNotationCalculate(postfixNotation); //후위 표기식 연산
}

function main(input) {
  const valid = isValid(input);
  console.log(valid);
  if (!valid) {
    //식이 유효하지 않음
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

function onKeyEvent(event) {
  if (event.key == "Enter") {
    const output = main(inputBox.value);
    if (output === false) {
      outputBox.value = "올바른 식을 입력해주세요.";
    } else {
      outputBox.value = output;
    }
    inputBox.value = "";
  }
}

function onClickEvent(event) {
  const output = main(inputBox.value);
  if (output === false) {
    outputBox.value = "올바른 식을 입력해주세요.";
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
