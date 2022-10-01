import axios from "axios";

/**
 * calculet_info_temp에 계산기 임시 등록 post 요청 보내는 함수
 * @param {object} data 계산기 등록 정보
 */
async function registerCalculetTemp(data) {
  let res;
  try {
    await axios.post("/api/calculets/", data).then((response) => {
      res = true;
    });
  } catch (error) {
    res = false;
  }
  return res;
}

export default registerCalculetTemp;
