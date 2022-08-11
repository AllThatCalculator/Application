import axios from "axios";

/**
 * 계산기 정보 - 서버에 요청
 * -> 보낼 데이터 없음.
 */
async function calculetsUser() {
  let data;
  try {
    await axios.get(`/calculets/`).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return error.response.data;
    }
  }
}
export default calculetsUser;
