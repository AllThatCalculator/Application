import { CALCULET_DEFAULT_ID } from "../../../constants/calculet";

function updateCalculetCount(calculetId) {
  if (calculetId !== localStorage.getItem("previousCalculet")) {
    // console.log("update!", calculetId);
    localStorage.setItem("previousCalculet", calculetId);
    localStorage.setItem("continueCnt", 0);
  } else {
    // console.log("continue");
    const cnt = localStorage.getItem("continueCnt");
    localStorage.setItem("continueCnt", Number(cnt) + 1);
  }
}

function loadOftenUsedCalculet() {
  // 자주 쓰는 계산기의 선정 기준
  const STANDARD_CNT = 3;

  // 연속 횟수
  const continueCnt = localStorage.getItem("continueCnt");

  // 이전 계산기
  const previousCalculet = localStorage.getItem("previousCalculet");

  // 만약 이전 계산기의 연속 횟수가 기준에 도달했다면 자주 쓰는 계산기 값 변경
  if (Number(continueCnt) >= STANDARD_CNT) {
    localStorage.setItem("oftenCalculet", previousCalculet);
  }

  // 만약 자주 쓰는 계산기가 비어있다면 초기화
  if (localStorage.getItem("oftenCalculet") === null) {
    localStorage.setItem("oftenCalculet", CALCULET_DEFAULT_ID);
    localStorage.setItem("previousCalculet", CALCULET_DEFAULT_ID);
    localStorage.setItem("continueCnt", 0);
  }

  // 자주 쓰는 계산기 가져오기
  return localStorage.getItem("oftenCalculet");
}

export { updateCalculetCount, loadOftenUsedCalculet };
