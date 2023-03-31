import axios from "axios";

async function getUserInfo(userId) {
  try {
    const response = await axios.get(`/api/users/me/profile`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
}

export default getUserInfo;
