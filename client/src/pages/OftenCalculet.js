function OftenCalculet() {
  // 자주 쓰는 계산기의 선정 기준
  const STANDARD_CNT = 3;

  // 연속 횟수
  const continueCnt = localStorage.getItem("continueCnt");

  // 이전 계산기
  const previewCalculet = localStorage.getItem("previewCalculet");

  // 만약 이전 계산기의 연속 횟수가 기준에 도달했다면 자주 쓰는 계산기 값 변경
  if (Number(continueCnt) === STANDARD_CNT) {
    localStorage.setItem("oftenCalculet", previewCalculet);
  }

  // 만약 자주 쓰는 계산기가 비어있다면 초기화
  if (localStorage.getItem("oftenCalculet") === null) {
    localStorage.setItem("oftenCalculet", 1);
    localStorage.setItem("previewCalculet", 1);
    localStorage.setItem("continueCnt", 1);
  }

  // 자주 쓰는 계산기 가져오기
  const oftenCalculet = localStorage.getItem("oftenCalculet");

  return <div>{oftenCalculet}</div>;
}

export default OftenCalculet;
