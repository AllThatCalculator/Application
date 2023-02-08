import axios from "axios";

/**
 * 좋아요 등록 | 취소
 * @param {*} state
 * @param {*} calculetId
 * @param {*} userId
 * @returns
 */
async function putCalculetLike(state, calculetId, userId) {
  // unlike(false) 일 때 눌렀으면, 좋아요 누른거니까 "like" 요청
  const requestUrl = state ? "unlike" : "like";

  let data;
  try {
    await axios
      .put(`/api/calculets/${requestUrl}/${calculetId}`, null, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        data = response.data;
      });
  } catch (error) {
    console.log(error);
  }
  return data;
}

export default putCalculetLike;
