import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * get calculet bookmark
 * @param {} userId
 * @returns
 */
async function getCalculetBookmark(userId) {
  try {
    const response = await axios.get(`/api/calculets/bookmark`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default getCalculetBookmark;
