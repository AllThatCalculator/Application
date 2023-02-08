import axios from "axios";

/**
 * 북마크 등록 | 취소
 * @param {*} state
 * @param {*} calculetId
 * @param {*} userId
 * @returns
 */
async function putCalculetBookmark(state, calculetId, userId) {
  // unbookmarked(false) 일 때 눌렀으면, 북마크 누른거니까 "bookmark" 요청
  const requestUrl = state ? "remove-bookmark" : "bookmark";

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
    // console.log(error);
  }
  return data;
}

export default putCalculetBookmark;
