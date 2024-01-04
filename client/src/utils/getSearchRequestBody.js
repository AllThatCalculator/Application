/**
 * find api에 필요한 body형태를 리턴
 * @param {*} categoryMainId
 * @param {*} categorySubId
 * @param {*} target
 * @param {*} keyword
 * @param {*} size
 * @param {*} page
 */
function getSearchRequestBody(
  categoryMainId,
  categorySubId,
  keyword,
  size,
  page,
  target
) {
  let result = {};

  if (categoryMainId !== "") {
    result["categoryMainId"] = categoryMainId;
  }
  if (categorySubId !== "") {
    result["categorySubId"] = categorySubId;
  }
  if (keyword !== "") {
    result["keyword"] = keyword;
  }
  result["size"] = size === 0 ? 20 : size; // (default) 20
  result["page"] = page === 0 ? 1 : page; // (default) 1

  if (target !== "") {
    result["target"] = target;
  }

  return result;
}

export default getSearchRequestBody;
