import axios from "axios";

/**
 * 계산기 정보 얻어오기 - 서버에 요청
 * - 계산기 전체 목록 페이지, 카테고리바에서 요청
 * - Object {대분류, 소분류에 따른 계산기 id, title}
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
