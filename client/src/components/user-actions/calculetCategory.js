import axios from "axios";

async function calculetCategory() {
  let data;
  try {
    await axios.get(`/calculets/category`).then((response) => {
      data = {
        main: response.data.categoryMain,
        sub: response.data.categorySub,
      };
    });
  } catch (error) {}
  return data;
}

export default calculetCategory;
