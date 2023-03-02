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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteCalculetRecords from "../../user-actions/deleteCalculetRecords";
import { Button } from "@mui/material";
import RecordDeleteWarningDialog from "./RecordDeleteWarningDialog";
import useSnackbar from "../../hooks/useSnackbar";
import useCalculetRecord from "../../hooks/useCalculetRecord";
import postCalculetRecords from "../../user-actions/postCalculetRecords";
import usePage from "../../hooks/usePage";
import { formatDayTime } from "../../utils/formatTime";

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

// table head cell
function TableHeadCellBox({
  order = null,
  onRequestSort = () => {},
  headCell,
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
        headCell
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
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;

  /*
    headCells = {
      inputObj: {
        value1: 10,
        value2: 20,
      },
      outputObj: {
        result: 300000,
      },
      createdAt: "2023-02-16 17:10:08",
      id: "7e4cbcdd-add1-11ed-8c8c-0a403e9fff5e",
    },
    */

  return (
    <>
      {headCells.length !== 0 && (
        <TableHead>
          <TableRow>
            <TableCell
              // 체크박스 - 전체 선택
              padding="checkbox"
            >
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
            </TableCell>
            <TableHeadCellBox
              // createAt
              key={KEY_CREATED_NAME}
              order={order}
              onRequestSort={onRequestSort}
              headCell={KEY_CREATED_NAME}
              align="left"
            />
            {
              // input - 왼쪽 정렬
              headCells.inputObj &&
                Object.keys(headCells.inputObj).map((data) => (
                  // 이름만 보내주면 됨.
                  <TableHeadCellBox key={data} headCell={data} align="left" />
                ))
            }
            {
              // output - 오른쪽 정렬
              headCells.outputObj &&
                Object.keys(headCells.outputObj).map((data) => (
                  // 이름만 보내주면 됨.
                  <TableHeadCellBox key={data} headCell={data} align="right" />
                ))
            }
          </TableRow>
        </TableHead>
      )}
    </>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, onDeleteCalculetRecords, onSaveCalculetRecords } = props;

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
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          선택 {numSelected} 개
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          내 계산 내역
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="삭제">
          <IconButton onClick={onDeleteCalculetRecords}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="수정사항 저장하기">
          <Button variant="contained" onClick={onSaveCalculetRecords}>
            수정 사항 저장하기
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

/**
 * 계산 이력 저장 버튼 컴포넌트
 * - 저장하기 버튼 누르면 먼저 iframe에 접근해서 값을 가져온 후, /record POST 요청으로 계산 이력 저장
 * @param {string} calculetId 계산기 번호
 */
function RecordCalculetHistory({ calculetId }) {
  const { openSnackbar } = useSnackbar();
  const { loginPage } = usePage();
  const {
    handleSetCalculetObj,
    handleGetCalculetRecords,
    handleAppendCalculetRecent,
    handleSetCellRecentDatas,
  } = useCalculetRecord();

  // user id token
  const {
    idToken,
    recordList: cellRecordDatas,
    calculetObj: headCells,
    recentList: cellRecentDatas,
  } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    recordList: state.calculetRecord.recordList,
    calculetObj: state.calculetRecord.calculetObj,
    recentList: state.calculetRecord.recentList,
  }));
  // table cell padding sx
  const paddingSx = { padding: "1.4rem 1.6rem" };

  /**
   * iframe내의 태그를 찾아서 반환해주는 함수
   * @param {string}
   * className: iframe내에 찾고자 하는 클래스 네임
   * @returns 태그 배열
   */
  function approachIframeTag(className) {
    return window.frames[0].document.querySelectorAll(`.${className}`);
  }

  /**
   * 태그 리스트 내의 값에 접근해서 object로 가공시키는 함수
   * @param {nodelist} data 태그 리스트
   * @returns object
   */
  function makeObject(data) {
    const obj = {};
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      const desc = data[i].attributes.atcDesc.value;
      const value = data[i].value;
      obj[desc] = value;
    }
    return obj;
  }

  /**
   * 태그 리스트 내의 값에 접근, object onchange handling
   * @param {nodelist} data 태그 리스트
   */
  function handleOnChangeObject(data) {
    for (let i = 0; i < data.length; i++) {
      const desc = data[i].attributes.atcDesc.value;
    }
  }

  /**
   * 저장하기 버튼 클릭 시 input, output 정보 object로 가공하고 서버에 보낼 데이터 가공 및 요청 보내는 함수
   */
  const [userInputObj, setUserInputObj] = useState("");
  const [userOutputTag, setUserOutputTag] = useState("");

  function getCalculetObj(tagName) {
    const tag = approachIframeTag(tagName);
    const obj = makeObject(tag);

    // // output onchange
    // if (tagName === "atc-calculet-input") {
    //   setUserOutputTag(obj);
    // }
    return obj;
  }

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

  // 전체 선택 handling
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // id로 식별해서 selected
      const newSelected = [...cellRecordDatas, ...cellRecentDatas].map(
        (n) => n.id
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
    setIsDeleteWarning(true);
  }
  // 계산 이력 삭제하기
  async function handleDeleteCalculetRecords() {
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

  useEffect(() => {
    // Header | input, output 열 이름 접근
    handleSetCalculetObj({
      calculetId: calculetId,
      inputObj: getCalculetObj("atc-calculet-input"),
      outputObj: getCalculetObj("atc-calculet-output"),
    });
  }, []);

  useEffect(() => {
    // (init) row | 계산 내역 가져오기
    handleGetCalculetRecords(calculetId);
  }, [idToken]);

  // useEffect(() => {
  //   Object.values(userOutputTag).map((data) =>
  //     console.log(`Input value changed: ${data}`)
  //   );
  // }, [userOutputTag]);
  /////////////////////////////////////////////

  // console.log("userOutputTag", userOutputTag);

  // useEffect(() => {
  //   const inputs = approachIframeTag("atc-calculet-input");
  //   // console.log(inputs);
  //   inputs.forEach((input) => {
  //     input.onchange = (event) => {
  //       console.log(`Input value changed: ${event.target.value}`);
  //       setUserOutputTag(1111);
  //     };
  //   });
  //   // console.log(inputs);

  //   // input.onchange = (event) => {
  //   //   console.log("Input value changed:", event.target.value);
  //   // };
  // }, []);
  // console.log(approachIframeTag("atc-calculet-input"));

  // (임시) 현재 입력, 출력 긁어와서 row 추가하는 함수
  function onClick() {
    const createTime = new Date().toISOString();

    let data = {
      createdAt: createTime,
      id: `${KEY_RECENT_CALCULATION}-${calculetId}-${createTime}`,
      inputObj: headCells.inputObj,
      outputObj: headCells.outputObj,
    };
    handleAppendCalculetRecent(data);
  }

  // 계산 내역 저장하기
  async function handleSaveCalculetRecords() {
    // 로그인 안 했으면 로그인 화면으로
    if (idToken === "") {
      loginPage();
      return;
    }

    if (cellRecentDatas.length <= 0) {
      openSnackbar(
        "basic",
        "저장할 이력이 없습니다.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
      return;
    }

    // 저장할 이력
    let recordArray = [];
    cellRecentDatas.forEach((item) => {
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
    // (init) 최근 계산 이력 초기화
    await handleSetCellRecentDatas([]);
    openSnackbar(
      "basic",
      "저장되었습니다.",
      false,
      "bottom",
      "left",
      1600 // 지속시간
    );
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Button onClick={onClick}>현재 결과 추가하기</Button>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDeleteCalculetRecords={handleOnDeleteWarning}
            onSaveCalculetRecords={handleSaveCalculetRecords}
          />
          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={
                  cellRecordDatas &&
                  cellRecentDatas &&
                  [...cellRecordDatas, ...cellRecentDatas].length
                }
                headCells={headCells}
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
                            <TableCell
                              sx={{ ...paddingSx }}
                              component="th"
                              scope="row"
                            >
                              {formatDayTime(row.createdAt)}
                            </TableCell>
                            {row.inputObj &&
                              Object.values(row.inputObj).map((data, index) => (
                                <TableCell
                                  key={index}
                                  sx={{ ...paddingSx }}
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  {data}
                                </TableCell>
                              ))}
                            {row.outputObj &&
                              Object.values(row.outputObj).map(
                                (data, index) => (
                                  <TableCell
                                    key={index}
                                    sx={{ ...paddingSx }}
                                    component="th"
                                    scope="row"
                                    align="right"
                                  >
                                    {data}
                                  </TableCell>
                                )
                              )}
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
      <RecordDeleteWarningDialog
        isOpen={isDeleteWarning}
        setIsOpen={setIsDeleteWarning}
        handleOnClick={handleDeleteCalculetRecords}
      />
    </>
  );
}

export default RecordCalculetHistory;
