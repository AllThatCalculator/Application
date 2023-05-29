import {
  ID_INPUT_CATEGORY_MAIN_ID,
  ID_INPUT_CATEGORY_SUB_ID,
} from "../constants/register";

/**
 * 계산기 대분류 change 함수
 * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
 * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
 */
function changeCategoryMain(value, setRegisterSelects) {
  const targetValue = value !== "" ? Number(value) : "";
  // setCategoryMainId(targetValue);
  // setCategorySubId(""); // 초기화
  setRegisterSelects([
    { name: ID_INPUT_CATEGORY_MAIN_ID, value: targetValue },
    { name: ID_INPUT_CATEGORY_SUB_ID, value: "" },
  ]);
}

/**
 * 계산기 소분류 change 함수
 * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
 */
function changeCategorySub(value, setRegisterSelect) {
  const targetValue = value !== "" ? Number(value) : "";
  setRegisterSelect({ name: ID_INPUT_CATEGORY_SUB_ID, value: targetValue });
}
export { changeCategoryMain, changeCategorySub };
