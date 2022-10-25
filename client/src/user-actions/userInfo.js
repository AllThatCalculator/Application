import axios from "axios";

async function loadUserInfo(userId) {
  let data;
  try {
    await axios.get(`/api/users/${userId}`).then((response) => {
      data = response.data.userInfo;
    });
  } catch (error) {}
  return data;
}

export default loadUserInfo;
