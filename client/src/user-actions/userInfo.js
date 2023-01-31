import axios from "axios";

async function loadUserInfo(userId) {
  let data;
  try {
    await axios
      .get(`/api/users/me/`, {
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

export default loadUserInfo;
