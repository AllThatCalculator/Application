import {
  Box,
  CardContent,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  PageScreenBox,
  PageWhiteScreenBox,
} from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleGetMyCalculetList } from "../utils/handleUserActions";
import usePage from "../hooks/usePage";
import { formatDayTime } from "../utils/formatTime";
import EnhancedTableHead from "../components/my-calculet/EnhancedTableHead";
import { DATA_MY_CALCULET_HEAD_CELLS } from "../constants/myCalculet";
import { FitTableCell } from "../components/atom-components/StyledTables";
import changeBlockedStatus from "../utils/changeBlockedStatus";
import { FlexBox } from "../components/global-components/FlexBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MyCalculetInfoBox from "../components/my-calculet/MyCalculetInfoBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function TableRowBox({
  myCalculet,
  isItemSelected,
  onClickSelectedMyCalculetList,
}) {
  const {
    id,
    title,
    blocked,
    bookmarkCnt,
    likeCnt,
    viewCnt,
    calculetId,
    calculetTemp,
    categoryMainId,
    categorySubId,
    createdAt,
    description,
    isEdit,
  } = myCalculet;

  // 수정 중인 계산기 펼치기
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow
        hover
        onClick={(event) => onClickSelectedMyCalculetList(event, id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": id,
            }}
            size="small"
          />
        </TableCell>
        <FitTableCell>
          <MyCalculetInfoBox
            title={title}
            description={description}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
          />
          <FlexBox
            sx={{ alignItems: "center" }}
            color={isEdit ? "black" : "text.disabled"}
          >
            <Typography variant="subtitle2">{`수정 중인 계산기 ${
              isEdit ? 1 : 0
            }개`}</Typography>
            <IconButton
              //   disabled={!isEdit}
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </FlexBox>
        </FitTableCell>
        <FitTableCell sx={{ color: changeBlockedStatus(blocked).color }}>
          {changeBlockedStatus(blocked).status}
        </FitTableCell>
        <FitTableCell>{formatDayTime(createdAt)}</FitTableCell>
        <FitTableCell align="right">{viewCnt}</FitTableCell>
        <FitTableCell align="right">{likeCnt}</FitTableCell>
        <FitTableCell align="right">{bookmarkCnt}</FitTableCell>
        <FitTableCell align="right">
          <IconButton size="small" onClick={() => {}}>
            <EditIcon />
          </IconButton>
        </FitTableCell>
        <FitTableCell>
          <IconButton size="small" onClick={() => {}}>
            <DeleteIcon />
          </IconButton>
        </FitTableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: "0" }} colSpan={100}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow
                    sx={{
                      backgroundColor: "atcBlue.100",
                      boxShadow: (theme) => theme.shadows[11],
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": id,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <FitTableCell>
                      <MyCalculetInfoBox
                        title={title}
                        description={description}
                        categoryMainId={categoryMainId}
                        categorySubId={categorySubId}
                      />
                    </FitTableCell>
                    <FitTableCell
                      sx={{ color: changeBlockedStatus(blocked).color }}
                    >
                      {changeBlockedStatus(blocked).status}
                    </FitTableCell>
                    <FitTableCell>{`마지막 수정 시간 ${formatDayTime(
                      createdAt
                    )}`}</FitTableCell>
                    <FitTableCell align="right">-</FitTableCell>
                    <FitTableCell align="right">-</FitTableCell>
                    <FitTableCell align="right">-</FitTableCell>
                    <FitTableCell align="right">
                      <IconButton size="small" onClick={() => {}}>
                        <EditIcon />
                      </IconButton>
                    </FitTableCell>
                    <FitTableCell>
                      <IconButton size="small" onClick={() => {}}>
                        <DeleteIcon />
                      </IconButton>
                    </FitTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

/**
 * 마이 계산기
 */
function MyCalculet() {
  const { loginPage } = usePage;
  // user id token
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  // 마이 계산기 list
  const [myCalculetList, setMyCalculetList] = useState([]);
  // 선택한 마이 계산기 list
  const [selectedMyCalculetList, setSelectedMyCalculetList] = useState([]);
  // 현재 page
  const [page, setPage] = useState(0);
  // 한 번에 볼 목록 개수
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ========== handle selected ==============
  function isSelectedMyCalculet(id) {
    return selectedMyCalculetList.indexOf(id) !== -1;
  }
  // 하나씩 선택 handling
  function onClickSelectedMyCalculetList(event, id) {
    const selectedIndex = selectedMyCalculetList.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMyCalculetList, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMyCalculetList.slice(1));
    } else if (selectedIndex === selectedMyCalculetList.length - 1) {
      newSelected = newSelected.concat(selectedMyCalculetList.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMyCalculetList.slice(0, selectedIndex),
        selectedMyCalculetList.slice(selectedIndex + 1)
      );
    }
    setSelectedMyCalculetList(newSelected);
  }
  // (option) 전체 선택 handling
  const handleSelectAll = () => {
    const newSelected = myCalculetList.map((n) => n.id).filter((n) => n);
    setSelectedMyCalculetList(newSelected); // update
  };

  // (checkBox) 전체 선택 handling
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      handleSelectAll();
      return;
    }
    setSelectedMyCalculetList([]);
  };

  // page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // per page row
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // 로그인 안 한 경우
    if (idToken === "") {
      setMyCalculetList([]);
      loginPage();
    }
    // 로그인 한 경우
    else {
      handleGetMyCalculetList(idToken).then((data) => {
        setMyCalculetList(data);
      });
    }
  }, []);

  console.log("myCalculetList", myCalculetList);

  // table cell padding sx
  const paddingSx = { padding: "1.4rem 1.6rem" };

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="1.6rem">
        <Title content="마이 계산기" />
        <Paper sx={{ width: "100%" }}>
          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selectedMyCalculetList.length}
                // order={order}
                onSelectAll={handleSelectAll}
                onSelectAllClick={handleSelectAllClick}
                // onSelectRecentClick={handleSelectRecentClick}
                // onSelectRecordClick={handleSelectRecordClick}
                // onRequestSort={handleRequestSort}
                rowCount={myCalculetList && myCalculetList.length}
                headCells={DATA_MY_CALCULET_HEAD_CELLS}
              />
              <TableBody>
                {myCalculetList &&
                  myCalculetList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((myCalculet) => {
                      const { id } = myCalculet;
                      // id로 식별해서 selected
                      const isItemSelected = isSelectedMyCalculet(id);

                      return (
                        // 계산기 정보 / 공개 상태 / 시간 / 조회수 / 좋아요 / 북마크
                        <TableRowBox
                          key={id}
                          myCalculet={myCalculet}
                          isItemSelected={isItemSelected}
                          onClickSelectedMyCalculetList={
                            onClickSelectedMyCalculetList
                          }
                        />
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          {
            // list 아무 것도 없는 경우
            myCalculetList && myCalculetList.length === 0 && (
              <Typography color="text.disabled" sx={{ ...paddingSx }}>
                등록한 계산기가 없습니다.
              </Typography>
            )
          }
          <TablePagination
            labelRowsPerPage="목록 개수"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={myCalculetList && myCalculetList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </PageScreenBox>
    </PageWhiteScreenBox>
  );
}
export default MyCalculet;
