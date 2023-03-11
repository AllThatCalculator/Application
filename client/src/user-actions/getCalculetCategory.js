import axios from "axios";

async function getCalculetCategory() {
  let data;
  try {
    await axios.get(`/file/utils/categoryV2.json`).then((response) => {
      data = response.data;
    });
  } catch (error) {}
  return data;
}

export default getCalculetCategory;
