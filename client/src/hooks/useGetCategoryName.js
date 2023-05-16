import { useSelector } from "react-redux";
import { NAME_MAIN_CONVERTER } from "../constants/calculetList";

function useGetCategoryName() {
  // calculet category json
  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
  }));

  // get main category name
  function getCategoryMainName(id) {
    const categoryId = Number(id);

    if (categoryId === 0) return NAME_MAIN_CONVERTER; // 0 (단위 변환기)
    return calculetCategory[categoryId].name;
  }

  // get sub category name
  function getCategorySubName(main, sub) {
    const mainId = Number(main);
    const subId = Number(sub);
    if (mainId === 0) return getCategoryMainName(subId); // 0 (단위 변환기) => subId가 mainId
    return calculetCategory[mainId][subId];
  }

  return { getCategoryMainName, getCategorySubName };
}
export default useGetCategoryName;
