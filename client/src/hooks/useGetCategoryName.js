import { useSelector } from "react-redux";

function useGetCategoryName() {
  // calculet category json
  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.main, // main에 바로 접근해서 변수에 저장
  }));

  // change Id to element
  function changeIdtoElement(element, id) {
    if (element.value === id) {
      return true;
    } else return false;
  }

  // get main category name
  function getCategoryMainName(categoryId) {
    if (categoryId === 0) return "단위 변환기"; // 0 (단위 변환기)

    const result = calculetCategory.find((element) =>
      changeIdtoElement(element, categoryId)
    );
    return result.name;
  }

  // get sub category name
  function getCategorySubName(mainId, subId) {
    if (mainId === 0) return getCategoryMainName(subId); // 0 (단위 변환기) => subId가 mainId

    // 대분류 먼저 접근
    const mainResult = calculetCategory.find((element) =>
      changeIdtoElement(element, mainId)
    );
    // 소분류 접근
    const subResult = mainResult.sub.find((element) =>
      changeIdtoElement(element, subId)
    );
    return subResult.name;
  }

  return { calculetCategory, getCategoryMainName, getCategorySubName };
}
export default useGetCategoryName;
