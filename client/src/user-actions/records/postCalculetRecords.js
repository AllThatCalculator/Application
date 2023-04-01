import axios from "axios";

/**
 * 계산 이력 저장
 */
async function postCalculetRecords(dataToSubmit = {}, userId = "") {
  try {
    await axios.post("/api/records", dataToSubmit, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return true;
  } catch (error) {
    // console.log("계산 내역 저장 에러", error);
    switch (error.response.status) {
      case 400: // 계산 이력 저장 오류
        return;
      case 404: // 계산기 찾지 못함
        return;
      default:
        return;
    }
  }
}

export default postCalculetRecords;
