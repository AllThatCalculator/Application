import { DATA_MY_CALCULET_BLOCKED } from "../constants/myCalculet";

/**
 * 공개 상태 변환기 (상태, 색)
 * @param {} date
 * @returns
 */
function changeBlockedStatus(blocked) {
  const result = DATA_MY_CALCULET_BLOCKED.find(
    (status) => status.id === blocked
  );
  return result;
}
export default changeBlockedStatus;
