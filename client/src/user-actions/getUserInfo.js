import axios from "axios";

async function getUserInfo(userId) {
  let data;
  try {
    await axios
      .get(`/api/users/me/profile`, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        data = response.data;
      });
  } catch (error) {}
  return data;
}

export default getUserInfo;
