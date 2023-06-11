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
function FindPwFormDialog({
  idInputEmailFindPw,
  isOpen,
  setIsOpen,
  value,
  onChange,
  onClickFindPwHandler,
  inputId,
}) {
  // redux state
  const { authError, errorType } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
  }));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>비밀번호 찾기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            비밀번호를 찾고자하는 이메일을 입력해주세요.
          </DialogContentText>
          <TextField
            id={idInputEmailFindPw}
            required
            autoFocus
            margin="normal"
            label="이메일"
            type="email"
            fullWidth
            variant="standard"
            value={value}
            onChange={onChange}
            error={errorType === inputId}
            helperText={errorType === inputId && authError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            variant="contained"
            disabled={!value}
            onClick={onClickFindPwHandler}
          >
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FindPwFormDialog;
