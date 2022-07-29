/**
 * 성별 옵션 - 여, 남
 */
const OPTIONS_SEX = [
  { value: "F", name: "여자" },
  { value: "M", name: "남자" },
];

/**
 * 생년월일 옵션 - 년도 (내림차순)
 */
const now = new Date();
const OPTIONS_YEAR = fillOptionsList(
  now.getFullYear() - 100,
  now.getFullYear()
).reverse();
/**
 * 생년월일 옵션 - 월 01~12
 */
const OPTIONS_MONTH = fillOptionsList(1, 12);

/**
 * start ~ end 만큼 연속된 값으로 옵션 채운 array 반환 함수
 * 년도와 월 (순서 상관 없이)에 따라서 SignUp에서 일수가 생김
 *
 * @param {int, int}
 * start : 처음 숫자
 * end : 끝 숫자
 */
function fillOptionsList(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    const num = i.toString().padStart(2, "0");
    result.push({ value: "birthdate" + num, name: num });
  }
  return result;
}

export { OPTIONS_SEX, OPTIONS_YEAR, OPTIONS_MONTH, fillOptionsList };
