/* 함수 이름 규칙 통일
타이틀[정수 사칙연산 계산기]
[필요한 함수] - 함수는 동사형으로, isValid같은건 변수 이름
- valid (식 유효한지 검사)
    - input: 입력식(string)
    - output: true / false
- parsing (식에서 단위 파싱)
    - input: 입력식
    - output: 배열
- calculate (파싱한 배열을 후위 표기식으로 바꾼 후, 값 계산)
    - 후위 표기식으로 변환
      - input: 파싱 결과 배열
      - output: 후위 표기식 배열
    - 연산
      - input: 후위 표기식 배열
      - output: 정수 (계산 결과)
    
[수도 코드]

const operator = new Set(['+', '-', '*', '/']) // +,-,*,/
const operatorPriority = new Map([['*', 1], ['/', 1], ['+', 2], ['-', 2], ['(', 3], [')', 3]]) // 후위 표기식 변환 시 필요한 연산자 우선순위
const bracket = new Map([[')', '('], ['}', '{'], [']', '[']]) // 닫는 괄호에 대해 여는 괄호 쌍 map에 저장

// 입력식이 유효한지 검사
function isPossible (input)
  if input 안에 '.'이 있음 // 소수 처리 아직 안되므로
    return false
  if 첫 문자가 '*' or 첫 문자가 '/' // '+', '-'는 첫 문자로 오는 거 가능
    return false
  if 마지막 문자가 operator안에 속함
    return false

  let isNumber = (첫 문자가 '-' or '+'면 false, 아니라면 true) // 숫자 -> 연산자 관계 파악하기 위한 변수
  let isFirst = false // 식의 첫 시작인지 파악하기 위한 변수, 여는 괄호 나오면 첫 시작으로 간주 (앞에 -, + 오는 예외 처리하기 위해)
  stack // 올바른 괄호 쌍 파악하기 위해 필요
  for (x: input) // 1번 인덱스부터 탐색
    if x가 여는 괄호
      isFirst = true
      stack에 삽입
      continue // 마지막 isFirst = false 초기화에 안 걸리도록 하기 위해 넘어감
    else if x가 닫는 괄호
      if isNumber is false // 그 전 값이 연산자라면
        return false
      isNumber = true // 닫는 괄호 뒤에는 연산자 와도 괜찮으므로 true로 바꿔줌
      if stack이 비어있음 or stack의 top 값(여는 괄호)이 bracket[x] 와 다름
        return false
      stack pop
    else if x가 operator안에 속함
      if isFirst and (x is '-' or x is '+')  // 첫 시작이 -, + 인건 괜찮으므로 넘어감
        isNumber = false
        isFirst = false
        continue
      if isNumber is false // 그 전 값이 연산자라면 연산자+연산자는 안되므로 false 리턴
        return false
      isNumber = false
    else //숫자
      isNumber = true
    isFirst = false 
  return true // 예외에 모두 걸리지 않았다면 유효한 입력식!
      
  if stack이 비어있지 않음 (올바르지 않은 괄호)
    return false
  return true


// 입력식 파싱하는 함수 (숫자, 연산기호, 괄호 분리)
function parsing (input)
  parsingResult []
  let isFirst = false // 처음 관리 (처음에 +, - 오는 거 관리하기 위해)
  let number // string, 수로 바꾸기 위해 문자열 우선 더해서 저장
  isMinus = false // 처음 시작에 음수 오는거 관리
  isPlus = false // 처음 시작에 '+'기호 붙는 거 관리

  if 처음 값 is '-'
    isMinus = true
  else if 처음 값 is '+'
    isPlus = true
  else // 숫자
    number += 처음 값

  for (x: input) // 1번 인덱스부터 탐색
    if isFirst is true and x is '-' // 처음 '-' 기호 처리
      isMinus = true
      isFirst = false
      continue // 수랑 같이 묶어야 하므로 넘어감
    if isFirst is true and x is '+' // 처음 '+' 기호 처리
      isPlus = true
      isFirst = false
      continue // 수랑 같이 묶어야 하므로 넘어감

    if x is digit // 숫자
      number += x
      continue
    // 숫자 x (연산 기호 or 괄호)
    if number이 비어있지 않음
      change number to integer
      if isMinus is true // 음수라면
        number * (-1)
        isMinus = false
      if isPlus is true // 양수라면 -> number은 이미 양수이므로 isPlus만 초기화
        isPlus = false
      parsingResult에 number 삽입
      number 초기화
    if x가 여는 괄호
      if isMinus is true or isPlus is true // +(1+2), -(1+2) 이런 형태
        현재 x의 뒤에 '1*' 삽입 // -(1+2) 같은 경우를 -1*(1+2)로 처리하기 위해
        continue // input 값이 달라졌으므로 넘어가서 다음 연산 실행
      if 현재 x 전 값이 숫자 || 현재 x 전 값이 닫는 괄호 // 곱하기 생략된 경우
        parsingResult에 '*' 삽입
      isFirst = true
      parsingResult에 '(' 삽입 // 소괄호로 통일
      continue // isFirst 초기화에 걸리지 않도록 넘어감
    else if x가 닫는 괄호
      parsingResult에 ')' 삽입 // 소괄호로 통일
    parsingResult에 x 삽입 // 연산 기호는 바로 삽입
    isFirst = false
  return parsingResult


// 두 수 받아서 사칙연산한 결과 돌려주는 함수
fuction arithmeticOperation (first, second, op)
  if op is '+'
    return first + second
  else if op is '-'
    return second - first
  else if op is '*'
    return first * second
  else if op is '/'
    return second / first


// 후위 표기식 계산하는 함수
function postfixNotationCalculte (postfixNotation [])
  for (x: postfixNotation)
    if x is integer // 정수
      stack에 x 삽입
      continue
    first = stack top값 
    stack pop
    second = stack top값
    stack pop
    stack에 arithmeticOperation(first, second, x) 값 삽입
  return stack의 top값


// 후위 표기식으로 변환하는 함수
function changePostfixNotation (expression [])
  postfixNotation []
  for (x: expression)
    if x is '('
      stack에 '(' 삽입
    else if x is ')'
      스택의 top 값이 '(' 일 때까지 postfixNotation에 스택의 top 값 추가
      '(' 제거
    else if x가 operator안에 속함
      현재 연산자의 우선순위와 같거나 더 높다면 스택에서 값 꺼내서 postfixNotation에 추가
      현재 연산자 스택에 삽입
    else // 피연산자
      postfixNotation에 추가
  스택에 연산자 남았다면 추가
  return postfixNotation
      

// 후위 표기식으로 변환해서 계산하는 함수      
function calculate (expression [])
  postfixNotation [] = changePostfixNotation(expression) // 후위 표기식으로 바꿔줌
  output = postfixNotationCalculte(postfixNotation) // 후위 표기식 연산
  return output


// 메인 함수
function main (input)
  const isPossible = isPossible(input)
  if isPossible is false
    return false
  const parsingResult = parsing(input)
  const output = calculate(parsingResult)
  return output
*/