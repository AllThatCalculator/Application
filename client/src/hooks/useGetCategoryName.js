import { useSelector } from "react-redux";

function useGetCategoryName() {
  // calculet category json
  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.main,
  }));

  // change Id to element
  function changeIdtoElement(element, id) {
    if (element.value === id) {
      return true;
    } else return false;
  }

  // get main category name
  function getCategoryMainName(categoryId) {
    const result = calculetCategory.find((element) =>
      changeIdtoElement(element, categoryId)
    );
    return result.name;
  }

  // get sub category name
  function getCategorySubName(mainId, subId) {
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

  return { getCategoryMainName, getCategorySubName };
}
export default useGetCategoryName;
