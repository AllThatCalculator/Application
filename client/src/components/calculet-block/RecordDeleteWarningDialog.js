import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

/**
 * 비밀번호 찾기 form
 * @param {bool} isOpen
 * @param {function} setIsOpen
 * @param {} value
 * @param {function} onChange
 */
function RecordDeleteWarningDialog({
  isOpen,
  setIsOpen,
  handleOnClick = () => {},
}) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
      <DialogContent>
        <DialogContentText>삭제하시면 복구할 수 없습니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button variant="contained" onClick={handleOnClick} color="error">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default RecordDeleteWarningDialog;
