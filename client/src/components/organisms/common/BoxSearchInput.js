import { React, useState } from "react";
import { IconButton, InputBase, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import usePage from "../../../hooks/usePage";
import { useDispatch } from "react-redux";
import {
  onResetSearchResultPreview,
  onSetSearchResultPreview,
} from "../../../modules/search";
import getCalculetFind from "../../../user-actions/calculets/getCalculetFind";
import getSearchRequestBody from "../../../utils/getSearchRequestBody";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.3),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.4),
  },
  marginLeft: 0,
  width: "100%",
  paddingRight: `calc(1em + ${theme.spacing(2)})`, // 글씨 쓴 거 없애는 X버튼을 위한 width
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchCloseWrapper = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: "0%",
  [theme.breakpoints.up("sm")]: {
    top: "-5%",
  },
  [theme.breakpoints.down("sm")]: {
    top: "-15%",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1, 0.8, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // md 이상일 때, 계산기 검색창 늘어났다 줄어들었다 애니메이션
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "28rem",
      "&:focus": {
        width: "36rem",
      },
    },
  },
}));

/**
 *
 * 검색바를 반환하는 함수
 * -> 검색창 내에 입력하면 엑스 아이콘 생김 -> 엑스 누르면 입력 내용 전체 삭제
 *
 * @param {Function} onIsSearchClose : full-screen 검색창 닫기
 *
 */
function BoxSearchInput({ onIsSearchClose = () => {} }) {
  const { searchOptionPage } = usePage();
  /** Redux Dispatch */
  const dispatch = useDispatch();

  // 입력한 내용
  const [inputText, setInputText] = useState("");

  // 입력 event
  const onChange = (event) => {
    let input = event.target.value;
    setInputText(input);

    // 빈칸이면 init & return
    if (input === "") {
      dispatch(onResetSearchResultPreview());
      return;
    }

    // 검색 결과 미리보기 api
    // 최대 20개만 보여주기
    // 미리보기에서는 all로
    const request = getCalculetFind(
      getSearchRequestBody("", "", input.trim(), 20, 1, "all")
    );
    request.then((res) => {
      dispatch(onSetSearchResultPreview(res.calculetList));
    });
  };

  // 제출 event
  const onSubmit = (event) => {
    event.preventDefault();
    if (inputText === "") return;

    // go search page
    // searchPage(inputText);
    searchOptionPage(inputText.trim(), "", "", 0, "");

    // init
    setInputText("");
    dispatch(onResetSearchResultPreview());
    onIsSearchClose();
  };

  // 입력 내용 전체 삭제
  const onReset = (event) => {
    event.preventDefault();
    setInputText("");
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          fullWidth
          type="text"
          placeholder="계산기 검색"
          value={inputText}
          onChange={onChange}
        />
        {inputText && (
          <SearchCloseWrapper onClick={onReset}>
            <CloseIcon />
          </SearchCloseWrapper>
        )}
      </Search>
    </Box>
  );
}
export default BoxSearchInput;
