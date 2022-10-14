import axios from "axios";

/**
 * 계산 내역 불러오는 함수
 * @param {*} calculetId 계산기 id
 */
async function getCalculetHistory(calculetId) {
  let data;
  try {
    await axios
      .get(`/api/record`, { params: { calculetId: calculetId } })
      .then((res) => {
        data = res.data;
      });
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
}
export default getCalculetHistory;
