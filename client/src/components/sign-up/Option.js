/**
 * 성별 옵션 - 여, 남
 */
const OPTIONS_SEX = [
  { value: "F", name: "여" },
  { value: "M", name: "남" },
];
/**
 * 생년월일 옵션 - 년도 1930~2022
 */
const OPTIONS_YEAR = fillOptionsList(1930, 2022);
/**
 * 생년월일 옵션 - 월 1~12
 */
const OPTIONS_MONTH = fillOptionsList(1, 12);
/**
 * 생년월일 옵션 - 일 1~31
 */
const OPTIONS_DATE = fillOptionsList(1, 31);
/**
 * start ~ end 만큼 연속된 값으로 옵션 채운 array 반환 함수
 *
 * @param {int, int}
 * start : 처음 숫자
 * end : 끝 숫자
 */
function fillOptionsList(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    const num = i.toString();
    result.push({ value: "birthdate" + num, name: num });
  }
  return result;
}

export { OPTIONS_SEX, OPTIONS_YEAR, OPTIONS_MONTH, OPTIONS_DATE };
