import axios from "axios";

/**
 * 계산기 정보 팝업 - 계산기 업데이트 로그
 * @param {*} calculetId 계산기 id
 */
async function getCalculetUpdateLog(calculetId) {
  let data;
  try {
    await axios.get(`/api/calculets/update-log/${calculetId}`).then((res) => {
      data = res.data;
    });
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
}
export default getCalculetUpdateLog;
