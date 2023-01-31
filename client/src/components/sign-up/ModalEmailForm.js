import EmailForm from "./EmailForm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useSx from "../../hooks/useSx";

function ModalEmailForm({ handleClose }) {
  const { isWindowSmDown } = useSx();
  return (
    <Dialog fullScreen={isWindowSmDown} open={true} onClose={handleClose}>
      <DialogTitle>동일한 메일로 계정이 이미 존재합니다.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          계정 연동을 원하시면 아래 이메일과 비밀번호를 입력해주세요.
        </DialogContentText>
        <EmailForm />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="outlined">
          연동하지 않음
        </Button>
        <Button onClick={handleClose} autoFocus variant="contained">
          연동
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEmailForm;
