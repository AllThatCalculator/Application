import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { FlexBox } from "../global-components/FlexBox";

// table head cell
function TableHeadCellBox({ headCell, align }) {
  return (
    <TableCell key={headCell} align={align} padding="normal">
      {headCell}
    </TableCell>
  );
}

/**
 * table 헤더
 * @param {*} props : 헤더 열 데이터
 */
function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, headCells } = props;

  //   // 계산 내역 선택 팝업창
  //   const [isRecordSelectedOption, setIsRecordSelectedOption] = useState(false);
  //   const clickFunctionList = {
  //     onSelectAllClick: onSelectAll,
  //     onSelectRecentClick: onSelectRecentClick,
  //     onSelectRecordClick: onSelectRecordClick,
  //   };

  return (
    <>
      {headCells.length !== 0 && (
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
                  // size="small"
                />
              </FlexBox>
            </TableCell>
            {headCells &&
              headCells.map(({ headCell, align }) => (
                <TableHeadCellBox
                  key={headCell}
                  headCell={headCell}
                  align={align}
                />
              ))}
            <TableHeadCellBox />
            <TableHeadCellBox />
          </TableRow>
        </TableHead>
      )}
    </>
  );
}
export default EnhancedTableHead;
