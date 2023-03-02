/**
 * UTC 시간이기 때문에, 한국과 9시간 차이남, 아래와 같이 해결
 * const d = new Date();
 * => new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString()
 * => 현재 날짜 & 시간 yyyy-mm-dd hh:mm:ss 형식으로 포맷
 *
 * 현재 형식이 string인 경우 date로 변환해줘야 함.
 * date를 date로 변환해줘도 상관x
 */
function formatTime(date) {
  const dateTmp = new Date(date);
  return new Date(dateTmp.getTime() - dateTmp.getTimezoneOffset() * 60000)
    .toISOString()
    .replace("T", " ")
    .replace(/\..*/, "");
}
export default formatTime;
