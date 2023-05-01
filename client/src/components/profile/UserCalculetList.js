import { Grid, Pagination, Typography } from "@mui/material";
import useSx from "../../hooks/useSx";
import TotalCount from "../atom-components/TotalCount";
import SearchFilter from "../global-components/SearchFilter";
import SearchSkeletonPage from "../search/SearchSkeletonPage";
import SearchCalculetList from "../global-components/SearchCalculetList";

function UserCalculetList({
  userInfo,
  userCalculetList,
  categoryMainId,
  handleChangeCategoryMain,
  categorySubId,
  handleChangeCategorySub,
  resultLimit,
  handleResultLimitChange,
  currentPage,
  handleCurrentPageChange,
  isCalculetListLoading,
}) {
  const { calculetList, count } = userCalculetList;
  const { userName } = userInfo;

  const { subTitleSx } = useSx();

  return (
    <>
      <Typography sx={{ ...subTitleSx }}>{userName}님의 계산기들</Typography>
      <Grid container sx={{ justifyContent: "space-between" }} gap="0.8rem">
        {/* 필터된 건수 */}
        <TotalCount length={count} />
        {/* 필터 */}
        <SearchFilter
          categoryMainId={categoryMainId}
          handleChangeCategoryMain={handleChangeCategoryMain}
          categorySubId={categorySubId}
          handleChangeCategorySub={handleChangeCategorySub}
          resultLimit={resultLimit}
          handleResultLimitChange={handleResultLimitChange}
        />
      </Grid>
      {!isCalculetListLoading && (
        <SearchCalculetList calculetList={calculetList} />
      )}
      {isCalculetListLoading && <SearchSkeletonPage />}
      <Grid container sx={{ w: 1, mt: "6.4rem", justifyContent: "center" }}>
        <Pagination
          count={
            // 전체 0일 경우 1 || 전체 / size
            count === 0 ? 1 : Math.ceil(count / resultLimit)
          }
          page={currentPage}
          onChange={handleCurrentPageChange}
        />
      </Grid>
    </>
  );
}
export default UserCalculetList;
