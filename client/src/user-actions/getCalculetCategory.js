import axios from "axios";

async function getCalculetCategory() {
  let data;
  try {
    await axios.get(`/file/utils/category.json`).then((response) => {
      data = response.data;
    });
  } catch (error) {}
  return data;
}

export default getCalculetCategory;