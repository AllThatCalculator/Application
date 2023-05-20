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
import {
  handleDeleteMyCalculet,
  handleGetMyCalculetList,
} from "../utils/handleUserActions";
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
import WarningDialog from "../components/global-components/WarningDialog";
import useSnackbar from "../hooks/useSnackbar";
import EnhancedTableToolbar from "../components/my-calculet/EnhancedTableToolbar";

function TableRowBox({
  myCalculet,
  isItemSelected,
  isSelectedMyCalculet,
  onClickSelectedMyCalculetList,
  handleDeleteCalculet,
}) {
  // 계산기 정보
  const {
    id,
    title,
    blocked,
    bookmarkCnt,
    likeCnt,
    viewCnt,
    // calculetId,
    calculetTemp,
    categoryMainId,
    categorySubId,
    createdAt,
    description,
    isEdit,
  } = myCalculet;

  //   // 수정 중인 계산기 정보
  //   const {
  //     id: calculetTempId,
  //     title: calculetTempTitle,
  //     blocked: calculetTempBlocked,
  //     bookmarkCnt: calculetTempBookmarkCnt,
  //     likeCnt: calculetTempLikeCnt,
  //     viewCnt: calculetTempViewCnt,
  //     categoryMainId: calculetTempCategoryMainId,
  //     categorySubId: calculetTempCategorySubId,
  //     createdAt: calculetTempCreatedAt,
  //     description: calculetTempDescription,
  //   } = calculetTemp;

  // 수정 중인 계산기 펼치기
  const [open, setOpen] = useState(false);

  // 상위 계산기 삭제 시, 경고 popup
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);
  function OnClickDeleteWarning() {
    setIsDeleteWarning(true);
  }

  // 수정 중인 계산기 삭제 시, 경고 popup
  const [isEditDeleteWarning, setIsEditDeleteWarning] = useState(false);
  function OnClickEditDeleteWarning() {
    setIsEditDeleteWarning(true);
  }

  return (
    <>
      <Fragment>
        <TableRow
          hover
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
              //   size="small"
              onClick={(event) => onClickSelectedMyCalculetList(event, id)}
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
                disabled={!isEdit}
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
            <IconButton
              size="small"
              color="primary"
              disabled={isEdit}
              onClick={() => {}}
            >
              <EditIcon />
            </IconButton>
          </FitTableCell>
          <FitTableCell>
            <IconButton
              size="small"
              color="primary"
              onClick={OnClickDeleteWarning}
            >
              <DeleteIcon />
            </IconButton>
          </FitTableCell>
        </TableRow>
        {isEdit && !!calculetTemp && (
          <TableRow>
            <TableCell sx={{ padding: "0" }} colSpan={100}>
              <Collapse in={open} timeout="auto" unmountOnExit>
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
                          checked={isSelectedMyCalculet(calculetTemp.id)}
                          inputProps={{
                            "aria-labelledby": calculetTemp.id,
                          }}
                          //   size="small"
                          onClick={(event) =>
                            onClickSelectedMyCalculetList(
                              event,
                              calculetTemp.id
                            )
                          }
                        />
                      </TableCell>
                      <FitTableCell>
                        <MyCalculetInfoBox
                          title={calculetTemp.title}
                          description={calculetTemp.description}
                          categoryMainId={calculetTemp.categoryMainId}
                          categorySubId={calculetTemp.categorySubId}
                        />
                      </FitTableCell>
                      <FitTableCell
                        sx={{
                          color: changeBlockedStatus(calculetTemp.blocked)
                            .color,
                        }}
                      >
                        {changeBlockedStatus(calculetTemp.blocked).status}
                      </FitTableCell>
                      <FitTableCell>{`(마지막 수정) ${formatDayTime(
                        calculetTemp.createdAt
                      )}`}</FitTableCell>
                      <FitTableCell align="right">-</FitTableCell>
                      <FitTableCell align="right">-</FitTableCell>
                      <FitTableCell align="right">-</FitTableCell>
                      <FitTableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {}}
                        >
                          <EditIcon />
                        </IconButton>
                      </FitTableCell>
                      <FitTableCell>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={OnClickEditDeleteWarning}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </FitTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </Fragment>
      <WarningDialog
        isOpen={isDeleteWarning}
        setIsOpen={setIsDeleteWarning}
        handleOnClick={(event) => handleDeleteCalculet(id, blocked)}
        title="정말 삭제하시겠습니까?"
        contentText={`• 수정 중인 계산기가 있을 시, 수정 중인 계산기는 삭제되지 않습니다.\n• 계산기를 삭제하시면 복구할 수 없습니다.`}
        actionText="삭제"
      />
      {!!calculetTemp && (
        <WarningDialog
          isOpen={isEditDeleteWarning}
          setIsOpen={setIsEditDeleteWarning}
          handleOnClick={(event) =>
            handleDeleteCalculet(calculetTemp.id, calculetTemp.blocked)
          }
          title="정말 삭제하시겠습니까?"
          contentText={`• 기존 계산기는 삭제되지 않고, 수정 중인 계산기만 삭제됩니다.\n• 계산기를 삭제하시면 복구할 수 없습니다.`}
          actionText="삭제"
        />
      )}
    </>
  );
}

/**
 * 마이 계산기
 */
function MyCalculet() {
  const { loginPage } = usePage;
  const { openSnackbar } = useSnackbar();
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

  // 삭제
  async function handleDeleteCalculet(id, blocked) {
    let body = {
      calculetId: id,
      blocked: blocked,
    };
    await handleDeleteMyCalculet(idToken, body);
    await openSnackbar(
      "basic",
      "삭제되었습니다.",
      false,
      "bottom",
      "left",
      1600 // 지속시간
    );
    await handleMyCalculetList();
  }

  // page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // per page row
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleMyCalculetList() {
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
  }

  useEffect(() => {
    handleMyCalculetList();
  }, []);

  // table cell padding sx
  const paddingSx = { padding: "1.4rem 1.6rem" };

  //   console.log(myCalculetList);

  return (
    <PageWhiteScreenBox>
      <PageScreenBox gap="1.6rem">
        <Title content="마이 계산기" />
        <Paper sx={{ width: "100%" }}>
          <EnhancedTableToolbar
            numSelected={selectedMyCalculetList.length}
            // onDeleteCalculetRecords={handleOnDeleteWarning}
            // onSaveCalculetRecords={handleSaveCalculetRecords}
            // onAddCalculetRecords={handleAddCalculetRecords}
          />
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
                        isSelectedMyCalculet={isSelectedMyCalculet}
                        onClickSelectedMyCalculetList={
                          onClickSelectedMyCalculetList
                        }
                        handleDeleteCalculet={handleDeleteCalculet}
                      />
                    );
                  })}
            </TableBody>
          </Table>
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
