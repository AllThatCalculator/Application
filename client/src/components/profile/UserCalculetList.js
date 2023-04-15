import { Grid, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSx from "../../hooks/useSx";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../../utils/changeCategorySelect";
import TotalCount from "../atom-components/TotalCount";
import SearchFilter from "../global-components/SearchFilter";

function UserCalculetList() {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));
  const { userName } = userInfo;
  const { subTitleSx } = useSx();

  const KEY_CALCULET_LENGTH = 0;

  // 선택된 대분류, 소분류 id
  //   const [categoryMainId, setCategoryMainId] = useState(
  //     categoryMainUrlId !== null ? categoryMainUrlId : ""
  //   );
  //   const [categorySubId, setCategorySubId] = useState(
  //     categorySubUrlId !== null ? categorySubUrlId : ""
  //   );
  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);
  const handleCurrentPageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [categoryMainId, setCategoryMainId] = useState("");
  const [categorySubId, setCategorySubId] = useState("");

  // result limit (default : 20)
  const KEY_DEFAULT_LEN = 20;
  //   const [resultLimit, setResultLimit] = useState(
  //     lenUrlId !== null ? lenUrlId : KEY_DEFAULT_LEN
  //   );
  const [resultLimit, setResultLimit] = useState(KEY_DEFAULT_LEN);
  function handleResultLimitChange(event) {
    let value = event.target.value;
    setResultLimit(value);

    // // update
    // searchOptionPage(searchUrlId, categoryMainId, categorySubId, value);
  }
  function handleChangeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;
    changeCategoryMain(value, setCategoryMainId, setCategorySubId);
  }
  function handleChangeCategorySub(event) {
    // 소분류 타겟 value 값
    let value = event.target.value;
    changeCategorySub(value, setCategorySubId);
  }

  return (
    <>
      <Typography sx={{ ...subTitleSx }}>{userName}님의 계산기들</Typography>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs>
          {/* 필터된 건수 */}
          <TotalCount length={KEY_CALCULET_LENGTH} />
        </Grid>
        <Grid item>
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
      </Grid>
      <Grid container sx={{ w: 1, mt: "6.4rem", justifyContent: "center" }}>
        <Pagination
          count={1}
          page={currentPage}
          onChange={handleCurrentPageChange}
        />
      </Grid>
    </>
  );
}
export default UserCalculetList;
