import axios from "axios";

/**
 * calculet_info_temp에 계산기 임시 등록 post 요청 보내는 함수
 */
async function postRegisterCalculetTemp(dataToSubmit = {}, userId) {
  let data;
  try {
    await axios
      .post(`/api/calculets`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  } catch (error) {
    console.log("계산기 등록 에러", error);
    switch (error.response.status) {
      case 409: // 이미 등록된 상태에서 한 번 더 요청 보냄 error
        window.location.href = URL.CALCULET;
        return;
      default:
        return;
    }
  }
}

export default postRegisterCalculetTemp;
