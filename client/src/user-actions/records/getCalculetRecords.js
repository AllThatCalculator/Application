import axios from "axios";

/**
 * 계산 내역 불러오는 함수
 * @param {*} calculetId 계산기 id
 * @param {*} userId user id token
 */
async function getCalculetRecords(calculetId = "", userId = "") {
  let data;
  try {
    await axios
      .get(`/api/records/${calculetId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((res) => {
        data = res.data;
      });
    return data;
  } catch (error) {
    // console.log("계산 이력 error", error);
    return null;
  }
}
export default getCalculetRecords;
