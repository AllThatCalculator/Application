import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

const KEY_TOTAL_MAIN = "대분류 전체";
const KEY_TOTAL_SUB = "소분류 전체";

/**
 * 검색 기능 시, Select 대분류, 소분류, limit 옵션 필터
 * @param {*} param0
 */
function SearchFilter({
  searchTarget,
  handleChangeSearchTarget,
  categoryMainId,
  handleChangeCategoryMain,
  categorySubId,
  handleChangeCategorySub,
  resultLimit,
  handleResultLimitChange,
}) {
  const SELECT_BOX_WIDTH = 132;

  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
  }));

  return (
    <Grid container sx={{ gap: "0.4rem", justifyContent: "flex-end" }}>
      {!!searchTarget && (
        <FormControl size="small" sx={{ width: SELECT_BOX_WIDTH }}>
          <Select value={searchTarget} onChange={handleChangeSearchTarget}>
            {[
              { value: "all", data: "통합 검색" },
              { value: "title", data: "계산기 제목" },
              { value: "desc", data: "계산기 설명" },
            ].map((targets) => {
              const { value, data } = targets;
              return (
                <MenuItem key={data} value={value}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      <FormControl size="small" sx={{ width: SELECT_BOX_WIDTH }}>
        <Select
          value={categoryMainId}
          onChange={handleChangeCategoryMain}
          displayEmpty
          renderValue={categoryMainId !== "" ? undefined : () => KEY_TOTAL_MAIN}
          sx={{ color: categoryMainId === "" && "text.disabled" }}
        >
          <MenuItem key="total-main" value="">
            {KEY_TOTAL_MAIN}
          </MenuItem>
          {calculetCategory &&
            Object.entries(calculetCategory).map((data) => {
              const mainId = Number(data[0]);
              const mainName = data[1].name;
              return (
                <MenuItem key={mainId} value={mainId}>
                  {mainName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl
        disabled={categoryMainId === ""}
        size="small"
        sx={{ width: SELECT_BOX_WIDTH }}
      >
        <Select
          value={categorySubId}
          onChange={handleChangeCategorySub}
          displayEmpty
          renderValue={categorySubId !== "" ? undefined : () => KEY_TOTAL_SUB}
          sx={{ color: categorySubId === "" && "text.disabled" }}
        >
          <MenuItem key="total-sub" value="">
            {KEY_TOTAL_SUB}
          </MenuItem>
          {calculetCategory &&
            Object.entries(calculetCategory).map((data) => {
              const mainId = Number(data[0]);
              const mainValue = data[1];
              const { name, ...subList } = mainValue; // name 제외하고 순회

              return (
                mainId === Number(categoryMainId) &&
                subList &&
                Object.entries(subList).map((subData) => {
                  const key = Number(subData[0]);
                  const value = subData[1];
                  return (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  );
                })
              );
            })}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: 82 }}>
        <Select value={resultLimit} onChange={handleResultLimitChange}>
          {[20, 40, 60].map((data) => (
            <MenuItem key={data} value={data}>
              {data}개
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
export default SearchFilter;
