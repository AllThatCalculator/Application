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

export default fillOptionsList;
