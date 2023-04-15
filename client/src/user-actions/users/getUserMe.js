import axios from "axios";

async function getUserMe(userId) {
  try {
    const response = await axios.get(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
  }
}

export default getUserMe;
