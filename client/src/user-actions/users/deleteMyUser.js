import axios from "axios";

/**
 * 계정 탈퇴 (firebase deleteUser와 구분하기 위해 My)
 * @param {} userId
 */
async function deleteMyUser(userId) {
  try {
    const response = await axios.delete(`/api/users`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return;
      case 401:
        return;
      default:
        return "404 NOT FOUND";
    }
  }
}

export default deleteMyUser;
