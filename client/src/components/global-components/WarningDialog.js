import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

/**
 * 경고 팝업창
 * @param {bool} isOpen
 * @param {function} setIsOpen
 * @param {function} handleOnClick
 * @param {function} title : 경고 제목
 * @param {function} contentText : 경고 문구
 * @param {function} actionText : 액션 버튼 text
 */
function WarningDialog({
  isOpen,
  setIsOpen,
  handleOnClick = () => {},
  title,
  contentText,
  actionText = "삭제",
}) {
  const handleClose = () => {
    setIsOpen(false);
  };

  async function onClickAction() {
    await handleOnClick();
    await handleClose();
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button variant="contained" onClick={onClickAction} color="error">
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default WarningDialog;
