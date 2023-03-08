import { useSelector } from "react-redux";

function useGetCategoryList() {
  // calculetList
  const { calculetList } = useSelector((state) => ({
    calculetList: state.calculetList,
  }));

  return { calculetList };
}
export default useGetCategoryList;
