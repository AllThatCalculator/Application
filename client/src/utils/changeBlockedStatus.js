/**
 * 공개 상태 변환기 (상태, 색)
 * @param {} date
 * @returns
 */
function changeBlockedStatus(blocked) {
  switch (blocked) {
    case 0: // 공개
      return { status: "공개", color: "success.light" };
    case 1: // 신고
      return { status: "신고 받은 계산기", color: "error.main" };
    case 2: // 임시
      return { status: "임시 계산기", color: "text.disabled" };
    default:
      return;
  }
}
export default changeBlockedStatus;
