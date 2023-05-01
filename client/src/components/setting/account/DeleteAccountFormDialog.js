import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Paper,
  LinearProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
/**
 * 탈퇴 form
 * @param {bool} isOpen
 * @param {function} setIsOpen
 * @param {} value
 * @param {function} onChange
 */
function DeleteAccountFormDialog({
  isOpen,
  setIsOpen,
  value,
  onChange,
  handleOnSubmit,
  password,
  isLoading,
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
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": { maxHeight: 640 },
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        {isLoading && <LinearProgress />}
        <DialogTitle>계정 탈퇴</DialogTitle>
        <DialogContent dividers>
          <Paper sx={{ p: "1.6rem", backgroundColor: red[50] }} elevation={0}>
            <DialogContentText
              sx={{ whiteSpace: "pre-wrap", color: "error.main" }}
            >
              {`회원탈퇴 시 아래 내용이 모두 삭제됩니다.\n• 내 정보 (이메일, 닉네임, 직업, 자기소개, 생년월일, 성별)\n• 내 계산기록\n• 좋아요, 북마크`}
            </DialogContentText>
            <DialogContentText sx={{ whiteSpace: "pre-wrap", color: "black" }}>
              {`\n아래 내용은 삭제되지 않습니다.\n• 내가 등록한 계산기`}
            </DialogContentText>
          </Paper>
          <DialogContentText sx={{ whiteSpace: "pre-wrap", mb: "0.8rem" }}>
            {`\n탈퇴하시면 복구할 수 없습니다. 계속하시려면 본인임을 인증하기 위해 비밀번호를 입력해주세요.`}
          </DialogContentText>
          {value.map((data) => {
            const { id, label, value, disabled } = data;

            return (
              <TextField
                key={id}
                id={id}
                type={id}
                disabled={disabled}
                value={value}
                onChange={onChange}
                label={label}
                autoFocus
                margin="normal"
                fullWidth
                variant="standard"
                focused
                error={errorType === id}
                helperText={errorType === id && authError}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            variant="contained"
            disabled={!password}
            onClick={handleOnSubmit}
            color="error"
          >
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteAccountFormDialog;
