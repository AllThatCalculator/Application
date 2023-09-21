import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  ID_INPUT_UPDATE_LOG,
  LIMIT_UPDATE_LOG,
} from "../../../constants/register";

/**
 *
 * @returns
 */
function UpdateLogDialog(props) {
  const { open, setOpen, updateLog, onChangeInputs, onClick } = props;

  // close modal
  function onModalClose() {
    setOpen(false);
  }

  // button disabled
  const isDisabled = updateLog.length === 0;

  return (
    <Dialog open={open} keepMounted onClose={onModalClose} fullWidth>
      <DialogTitle>업데이트 로그 입력</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          무엇을 수정하셨는지 간단하게 작성해주세요. (추후 수정 불가)
        </DialogContentText>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          placeholder="ex. 설명 수정"
          id={ID_INPUT_UPDATE_LOG}
          value={updateLog}
          onChange={onChangeInputs}
          helperText={`${updateLog.length}/${LIMIT_UPDATE_LOG}`}
          inputProps={{
            maxLength: LIMIT_UPDATE_LOG,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onModalClose}>닫기</Button>
        <Button variant="contained" disabled={isDisabled} onClick={onClick}>
          수정 완료
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default UpdateLogDialog;
