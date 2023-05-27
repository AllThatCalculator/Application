import {
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
import { TagChip } from "../atom-components/StyledChips";
import { DATA_MY_CALCULET_BLOCKED } from "../../constants/myCalculet";
/**
 * 테이블 헤더 Toolbar : 저장, 삭제 등
 * @param {*} props
 */
function EnhancedTableToolbar(props) {
  const {
    // numSelected,
    // onDeleteCalculetRecords,
    // onSaveCalculetRecords,
    // onAddCalculetRecords,
    selectedFilter,
    handleSelectedFilter,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
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
            <MenuItem key={id} onClick={(event) => handleSelectedFilter(item)}>
              {status}
            </MenuItem>
          );
        })}
      </Menu>
    </Toolbar>
  );
}
export default EnhancedTableToolbar;
