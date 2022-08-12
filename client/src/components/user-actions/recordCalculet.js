import axios from "axios";

async function recordCalculet(data) {
  try {
    await axios.post("/record", data);
    return true;
  } catch (error) {
    return error.response.status;
  }
}

export default recordCalculet;
