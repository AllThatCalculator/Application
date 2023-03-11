import { useSelector } from "react-redux";

const KEY_UNIT = "단위 변환기";

function useGetCategoryName() {
  // calculet category json
  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
  }));

  // get main category name
  function getCategoryMainName(categoryId) {
    if (categoryId === 0) return KEY_UNIT; // 0 (단위 변환기)
    return calculetCategory[categoryId].name;
  }

  // get sub category name
  function getCategorySubName(mainId, subId) {
    if (mainId === 0) return getCategoryMainName(subId); // 0 (단위 변환기) => subId가 mainId
    return calculetCategory[mainId][subId];
  }

  return { getCategoryMainName, getCategorySubName };
}
export default useGetCategoryName;
