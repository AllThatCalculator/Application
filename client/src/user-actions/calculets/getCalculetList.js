import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * 계산기 목록 얻어오기
 */
async function getCalculetList() {
  let data;
  try {
    await axios.get(`/api/calculets/`).then((response) => {
      data = response.data;
    });
    return data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}
export default getCalculetList;
