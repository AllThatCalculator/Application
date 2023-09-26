import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import deleteCalculetRecords from "../../../user-actions/records/deleteCalculetRecords";
import { Button } from "@mui/material";
import useSnackbar from "../../../hooks/useSnackbar";
import useCalculetRecord from "../../../hooks/useCalculetRecord";
import postCalculetRecords from "../../../user-actions/records/postCalculetRecords";
import usePage from "../../../hooks/usePage";
import { formatDayTime } from "../../../utils/formatTime";
import { FlexBox } from "../common/FlexBox";
import RecordSelectedOption from "./RecordSelectedOption";
import usePreventLeave from "../../../hooks/usePreventLeave";
import { getCalculetInOutputObj } from "../../../utils/setCalculetInOutputObj";
import WarningDialog from "../common/WarningDialog";
import { FitTableCell } from "../common/StyledTables";

// orderBy key constant
const KEY_CREATED_AT = "createdAt";
// cell name key constant
const KEY_CREATED_NAME = "시간";

// user recent calculation list
const KEY_RECENT_CALCULATION = "recent-calculation";

/**
 * comparison
 * @param {*} a
 * @param {*} b
 * @param {*} orderBy : 비교할 field
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * 오름, 내림차순 비교
 * @param {*} order   :
 * @param {*} orderBy : 비교할 field
 */
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table head cell : orderBy.시간
function TableHeadCellBox({
  order = null,
  onRequestSort = () => {},
  headCell,
  label,
  align,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const isCreateAt = headCell === KEY_CREATED_NAME ? true : false;

  return (
    <TableCell
      key={headCell}
      align={align}
      padding="normal"
      sortDirection={isCreateAt && order}
    >
      {isCreateAt ? (
        <TableSortLabel
          active={true}
          direction={order}
          onClick={createSortHandler(headCell)}
        >
          {headCell}
        </TableSortLabel>
      ) : (
        label
      )}
    </TableCell>
  );
}

/**
 * table 헤더
 * @param {*} props : 헤더 열 데이터
 */
function EnhancedTableHead(props) {
  const {
    onSelectAll,
    onSelectAllClick,
    onSelectRecentClick,
    onSelectRecordClick,
    order,
    numSelected,
    rowCount,
    onRequestSort,
    calculetObj,
  } = props;

  // 계산 내역 선택 팝업창
  const [isRecordSelectedOption, setIsRecordSelectedOption] = useState(false);
  const clickFunctionList = {
    onSelectAllClick: onSelectAll,
    onSelectRecentClick: onSelectRecentClick,
    onSelectRecordClick: onSelectRecordClick,
  };

  return (
    <>
      {!!calculetObj.labelDict && (
        <TableHead>
          <TableRow>
            <TableCell
              // 체크박스 - 전체 선택
              padding="checkbox"
            >
              <FlexBox sx={{ alignItems: "center" }}>
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                  size="small"
                />
                <RecordSelectedOption
                  isPopUpOpen={isRecordSelectedOption}
                  setIsPopUpOpen={setIsRecordSelectedOption}
                  clickFunctionList={clickFunctionList}
                />
              </FlexBox>
            </TableCell>
            <TableHeadCellBox
              // createAt
              key={KEY_CREATED_NAME}
              order={order}
              onRequestSort={onRequestSort}
              headCell={KEY_CREATED_NAME}
              label={KEY_CREATED_NAME}
              align="left"
            />
            {
              // input - 왼쪽 정렬
              calculetObj.inputObj &&
                calculetObj.inputObj.map((data) => (
                  // 이름만 보내주면 됨.
                  <TableHeadCellBox
                    key={data}
                    headCell={data}
                    label={calculetObj.labelDict[data]}
                    align="left"
                  />
                ))
            }
            {
              // output - 오른쪽 정렬
              calculetObj.outputObj &&
                calculetObj.outputObj.map((data) => (
                  // 이름만 보내주면 됨.
                  <TableHeadCellBox
                    key={data}
                    headCell={data}
                    label={calculetObj.labelDict[data]}
                    align="right"
                  />
                ))
            }
          </TableRow>
        </TableHead>
      )}
    </>
  );
}

/**
 * 테이블 헤더 Toolbar : 저장, 삭제 등
 * @param {*} props
 */
function EnhancedTableToolbar(props) {
  const {
    numSelected,
    onDeleteCalculetRecords,
    onSaveCalculetRecords,
    onAddCalculetRecords,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <FlexBox sx={{ alignItems: "center", gap: "0.8rem" }}>
          <Button variant="text" onClick={onSaveCalculetRecords}>
            저장
          </Button>
          <></>
          <Button
            variant="text"
            onClick={onDeleteCalculetRecords}
            color="error"
          >
            삭제
          </Button>
          <Typography
            sx={{ fontWeight: "bold", ml: "0.4rem" }}
            color="info.main"
            variant="button"
            component="div"
          >
            선택 {numSelected}개
          </Typography>
        </FlexBox>
      ) : (
        <FlexBox width={1}>
          <Typography
            sx={{ flex: "1 1 100%", m: "0.8rem" }}
            variant="h6"
            component="div"
          >
            내 계산 내역
          </Typography>
          <Button
            variant="contained"
            onClick={onAddCalculetRecords}
            sx={{ height: "fit-content", alignSelf: "center" }}
          >
            현재 결과 추가하기
          </Button>
        </FlexBox>
      )}
    </Toolbar>
  );
}

/**
 * 계산 이력 저장 버튼 컴포넌트
 * - 저장하기 버튼 누르면 먼저 iframe에 접근해서 값을 가져온 후, /record POST 요청으로 계산 이력 저장
 * @param {string} calculetId 계산기 번호
 */
function RecordCalculetHistory({ calculetId, isPreview, type }) {
  const { openSnackbar } = useSnackbar();
  const { loginPage } = usePage();
  const {
    handleGetCalculetRecords,
    handleAppendCalculetRecent,
    handleSetCellRecentDatas,
  } = useCalculetRecord();
  const preventLeave = usePreventLeave();

  // user id token
  const {
    idToken,
    recordList: cellRecordDatas,
    calculetObj,
    recentList: cellRecentDatas,
    recentInputOutput,
  } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    recordList: state.calculetRecord.recordList,
    calculetObj: state.calculetRecord.calculetObj,
    recentList: state.calculetRecord.recentList,
    recentInputOutput: state.calculetRecord.recentInputOutput,
  }));
  // table cell padding sx
  const paddingSx = { padding: "1.4rem 1.6rem" };

  // 시간 default 최근순 (내림차순)
  const [order, setOrder] = useState("desc");
  // 선택한 list
  const [selected, setSelected] = useState([]);
  // 현재 page
  const [page, setPage] = useState(0);
  // 한 번에 볼 목록 개수
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
  };

  // (option) 전체 선택 handling
  const handleSelectAll = () => {
    const newSelected = [...cellRecordDatas, ...cellRecentDatas]
      .map((n) => n.id)
      .filter((n) => n);
    setSelected(newSelected); // update
  };

  // (checkBox) 전체 선택 handling
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      handleSelectAll();
      return;
    }
    setSelected([]);
  };

  // 최근 계산 내역 선택 handling
  const handleSelectRecentClick = () => {
    const newSelected = [...cellRecordDatas, ...cellRecentDatas]
      .map((n) => isRecentData(n.id) && n.id)
      .filter((n) => n);
    setSelected(newSelected); // update
  };

  // 과거 계산 내역 선택 handling
  const handleSelectRecordClick = () => {
    const newSelected = [...cellRecordDatas, ...cellRecentDatas]
      .map((n) => !isRecentData(n.id) && n.id)
      .filter((n) => n);
    setSelected(newSelected); // update
  };

  // 하나씩 선택 handling
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  // 해당 id가 선택되었는지 handling
  function isSelected(id) {
    return selected.indexOf(id) !== -1;
  }

  // 최근 저장 내역인지 handling
  function isRecentData(id) {
    return id.includes(KEY_RECENT_CALCULATION);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cellRecordDatas.length) : 0;

  // 삭제 시, 경고 popup
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);
  function handleOnDeleteWarning() {
    // 미리보기면 return
    if (isPreview) {
      return;
    }
    setIsDeleteWarning(true);
  }
  // 계산 이력 삭제하기
  async function handleDeleteCalculetRecords() {
    // 미리보기면 return
    if (isPreview) {
      return;
    }
    if (selected.length <= 0) return;

    // ====== recent calculation ======
    if (cellRecentDatas.length > 0) {
      // id가 selected에서 같은 것들을 제외한 것만 남긴다
      let recentSelected = cellRecentDatas.filter(
        (item) => selected.indexOf(item.id) < 0
      );
      handleSetCellRecentDatas(recentSelected);
    }

    // ====== record calculation ======
    let recordSelected = selected.filter(function (id) {
      return !isRecentData(id);
    });

    if (recordSelected.length > 0) {
      let body = {
        calculetId: calculetId,
        recordIdList: recordSelected,
      };

      if (idToken !== "") {
        await deleteCalculetRecords(body, idToken);
        // (update) row | 계산 내역 가져오기
        await handleGetCalculetRecords(calculetId);
      }
    }

    // init
    setIsDeleteWarning(false);
    setSelected([]);

    openSnackbar(
      "basic",
      "삭제되었습니다.",
      false,
      "bottom",
      "left",
      1600 // 지속시간
    );
  }

  // (임시) 현재 입력, 출력 긁어와서 row 추가하는 함수
  function handleAddCalculetRecords() {
    const createTime = new Date().toISOString();

    let record;
    switch (type) {
      case 0:
        record = getCalculetInOutputObj(calculetObj);
        break;
      case 1:
        // inputoutput 객체 작성
        record = recentInputOutput;
        break;
      default:
    }
    const data = {
      createdAt: createTime,
      id: `${KEY_RECENT_CALCULATION}-${calculetId}-${createTime}`,
      ...record,
    };

    handleAppendCalculetRecent(data);
  }

  // 계산 내역 저장하기
  async function handleSaveCalculetRecords() {
    // 미리보기면 return
    if (isPreview) {
      return;
    }

    if (selected.length <= 0) return;

    // 로그인 안 했으면 로그인 화면으로
    if (idToken === "") {
      loginPage();
      return;
    }

    // ====== recent calculation ======
    // id가 selected에서 같은 것만 남긴다
    let recentSelected = cellRecentDatas.filter(
      (item) => selected.indexOf(item.id) >= 0
    );
    // id가 selected에서 같은 것들을 제외한 것만 남긴다
    let recentNotSelected = cellRecentDatas.filter(
      (item) => selected.indexOf(item.id) < 0
    );
    handleSetCellRecentDatas(recentNotSelected);

    if (recentSelected.length <= 0) {
      openSnackbar(
        "basic",
        "선택한 항목 중, 최근에 계산한 이력이 없어 저장할 내용이 없습니다.",
        false,
        "bottom",
        "left",
        3600 // 지속시간
      );
      return;
    }

    // 저장할 이력
    let recordArray = [];
    recentSelected.forEach((item) => {
      recordArray.push({
        inputObj: item.inputObj,
        outputObj: item.outputObj,
        createdAt: item.createdAt,
      });
    });

    let body = {
      recordArray: recordArray,
      calculetId: calculetId,
    };
    await postCalculetRecords(body, idToken);
    // (update) row | 계산 내역 가져오기
    await handleGetCalculetRecords(calculetId);

    // (init)
    setSelected([]);
    openSnackbar(
      "basic",
      "저장되었습니다.",
      false,
      "bottom",
      "left",
      1600 // 지속시간
    );
  }

  // 저장할 계산 내역이 남았는데, 페이지 나가려고 할 때 주의문
  useEffect(() => {
    if (cellRecentDatas.length > 0) {
      preventLeave.enablePrevent();
    } else {
      preventLeave.disablePrevent();
    }
  }, [cellRecentDatas, preventLeave]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDeleteCalculetRecords={handleOnDeleteWarning}
            onSaveCalculetRecords={handleSaveCalculetRecords}
            onAddCalculetRecords={handleAddCalculetRecords}
          />
          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onSelectAll={handleSelectAll}
                onSelectAllClick={handleSelectAllClick}
                onSelectRecentClick={handleSelectRecentClick}
                onSelectRecordClick={handleSelectRecordClick}
                onRequestSort={handleRequestSort}
                rowCount={
                  cellRecordDatas &&
                  cellRecentDatas &&
                  [...cellRecordDatas, ...cellRecentDatas].length
                }
                calculetObj={calculetObj}
              />
              <TableBody>
                {
                  // 로그인 or 비로그인 유저가 계산했던 계산 내역 보여주기
                  // 로그인 유저가 계산했던 계산 내역 가져오기
                  cellRecordDatas &&
                    cellRecentDatas &&
                    stableSort(
                      [...cellRecordDatas, ...cellRecentDatas],
                      getComparator(order, KEY_CREATED_AT)
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const labelId = row.id;
                        // id로 식별해서 selected
                        const isItemSelected = isSelected(labelId);
                        const isItemRecentData = isRecentData(labelId);
                        return (
                          // createdAt - inputObj - outputObj 나열
                          <TableRow
                            key={labelId}
                            hover
                            onClick={(event) => handleClick(event, labelId)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                            sx={{
                              // 최근 저장 내역인 경우 구분
                              backgroundColor:
                                isItemRecentData && "atcGreen.50",
                              "&.Mui-selected": {
                                backgroundColor:
                                  isItemRecentData && "atcGreen.100",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor:
                                  isItemRecentData && "atcGreen.200",
                              },
                            }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                              />
                            </TableCell>
                            <FitTableCell isBold={isItemRecentData}>
                              {formatDayTime(row.createdAt)}
                            </FitTableCell>
                            {calculetObj.inputObj &&
                              calculetObj.inputObj.map((id) => (
                                <FitTableCell
                                  key={id}
                                  isBold={isItemRecentData}
                                  align="left"
                                >
                                  {row.inputObj[id]}
                                </FitTableCell>
                              ))}
                            {calculetObj.outputObj &&
                              calculetObj.outputObj.map((id) => (
                                <FitTableCell
                                  key={id}
                                  isBold={isItemRecentData}
                                  align="right"
                                >
                                  {row.outputObj[id]}
                                </FitTableCell>
                              ))}
                          </TableRow>
                        );
                      })
                }
                {/* {
                // 남은 줄
                emptyRows > 0 && (
                  <TableRow
                  // style={{
                  //   height: (dense ? 33 : 53) * emptyRows,
                  // }}
                  >
                    <TableCell
                      colSpan={6}
                      sx={{
                        ...paddingSx,
                      }}
                    />
                  </TableRow>
                )
              } */}
              </TableBody>
            </Table>
          </TableContainer>
          {
            // recent and record 아무 것도 없는 경우
            cellRecordDatas &&
              cellRecordDatas.length === 0 &&
              cellRecentDatas &&
              cellRecentDatas.length === 0 && (
                <Typography color="text.disabled" sx={{ ...paddingSx }}>
                  계산 내역이 없습니다.
                </Typography>
              )
          }
          <TablePagination
            labelRowsPerPage="목록 개수"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              cellRecordDatas &&
              cellRecentDatas &&
              cellRecordDatas.length + cellRecentDatas.length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <WarningDialog
        isOpen={isDeleteWarning}
        setIsOpen={setIsDeleteWarning}
        handleOnClick={handleDeleteCalculetRecords}
        title="정말 삭제하시겠습니까?"
        contentText="삭제하시면 복구할 수 없습니다."
        actionText="삭제"
      />
    </>
  );
}

export default RecordCalculetHistory;
