import axios from "axios";

async function loadUserInfo(userEmail) {
  let data;
  try {
    await axios.get(`/api/users/${userEmail}`).then((response) => {
      data = response.data.userInfo;
    });
  } catch (error) {}
  return data;
}

export default loadUserInfo;
