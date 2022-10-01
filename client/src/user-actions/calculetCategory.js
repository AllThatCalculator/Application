import axios from "axios";

async function calculetCategory() {
  let data;
  try {
    await axios.get(`/api/calculets/category`).then((response) => {
      data = response.data;
    });
  } catch (error) {}
  return data;
}

export default calculetCategory;
