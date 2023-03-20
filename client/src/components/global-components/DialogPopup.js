import { Dialog, DialogTitle } from "@mui/material";
import StyledListItem from "./StyledListItem";

/**
 * Dialog Popup
 * @param {Array} listData : popup list data
 */
function DialogPopup({ listData, title = "", onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open}>
      {title !== "" && <DialogTitle>{title}</DialogTitle>}
      {listData.map((data) => (
        <StyledListItem key={data.name} data={data} />
      ))}
    </Dialog>
  );
}
export default DialogPopup;
