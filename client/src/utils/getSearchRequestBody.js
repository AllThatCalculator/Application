/**
 * find api에 필요한 body형태를 리턴
 * @param {*} categoryMainId
 * @param {*} categorySubId
 * @param {*} title
 * @param {*} limit
 */
function getSearchRequestBody(categoryMainId, categorySubId, title, limit) {
  let result = {};

  if (categoryMainId !== "") {
    result["categoryMainId"] = categoryMainId;
  }
  if (categorySubId !== "") {
    result["categorySubId"] = categorySubId;
  }
  if (title !== "") {
    result["title"] = title;
  }
  if (limit !== 0) {
    result["limit"] = limit;
  }
  return result;
}

export default getSearchRequestBody;
