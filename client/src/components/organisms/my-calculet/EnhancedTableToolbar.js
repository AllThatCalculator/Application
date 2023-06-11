import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { TagChip } from "../common/StyledChips";
import { DATA_MY_CALCULET_BLOCKED } from "../../../constants/myCalculet";
import { FlexBox } from "../common/FlexBox";
import WarningDialog from "../common/WarningDialog";
/**
 * 테이블 헤더 Toolbar : 저장, 삭제 등
 * @param {*} props
 */
function EnhancedTableToolbar(props) {
  const {
    numSelected,
    // onDeleteCalculetRecords,
    // onSaveCalculetRecords,
    // onAddCalculetRecords,
    selectedFilter,
    handleSelectedFilter,
    handleAllDeleteCalculet,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  // 전체 삭제 경고
  const [isAllDeleteWarning, setIsAllDeleteWarning] = useState(false);
  function OnClickAllDeleteWarning() {
    setIsAllDeleteWarning(true);
  }

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 0.6 },
          borderBottom: "1px solid",
          borderColor: "divider",
          gap: "1.6rem",
        }}
      >
        <Tooltip title="필터">
          <IconButton onClick={handleClickListItem}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {selectedFilter.length === 0 && (
          <Typography sx={{ color: "text.disabled" }}>필터</Typography>
        )}
        {selectedFilter.map((item) => {
          const { id, status, color } = item;
          return (
            <TagChip
              key={id}
              size="small"
              label={status}
              color={color}
              onClick={() => handleSelectedFilter(item)}
              onDelete={() => handleSelectedFilter(item)}
            />
          );
        })}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {DATA_MY_CALCULET_BLOCKED.map((item, index) => {
            const { id, status } = item;
            return (
              <MenuItem
                key={id}
                onClick={(event) => handleSelectedFilter(item)}
              >
                {status}
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
      {numSelected > 0 && (
        <FlexBox
          sx={{
            p: 0.6,
            alignItems: "center",
            gap: "0.8rem",
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }}
        >
          <Button
            variant="text"
            color="error"
            onClick={OnClickAllDeleteWarning}
          >
            삭제
          </Button>
          <Typography
            sx={{ fontWeight: "bold", ml: "0.4rem" }}
            color="info.main"
            variant="button"
          >
            선택 {numSelected}개
          </Typography>
        </FlexBox>
      )}
      <WarningDialog
        isOpen={isAllDeleteWarning}
        setIsOpen={setIsAllDeleteWarning}
        handleOnClick={handleAllDeleteCalculet}
        title="정말 삭제하시겠습니까?"
        contentText={`• 각 계산기마다 수정 중인 계산기가 있을 시, 수정 중인 계산기는 삭제되지 않습니다.\n• 계산기를 삭제하시면 복구할 수 없습니다.`}
        actionText="삭제"
      />
    </>
  );
}
export default EnhancedTableToolbar;
