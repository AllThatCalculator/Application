import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { onChangeClose } from "../../modules/snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

/**
 * 알림창
 */
function Snackbars() {
  /** Redux Dispatch */
  const dispatch = useDispatch();

  const { open, severity, message, fullWidth, vertical, horizontal } =
    useSelector((state) => ({
      open: state.snackbar.open,
      severity: state.snackbar.severity,
      message: state.snackbar.message,
      fullWidth: state.snackbar.fullWidth,
      vertical: state.snackbar.vertical,
      horizontal: state.snackbar.horizontal,
    }));

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   // 바깥 클릭해도 안 없어짐.
    //   return;
    // }
    dispatch(onChangeClose());
  };

  const marginSx = {
    xs: vertical === "top" ? "6rem" : "0rem",
    sm: vertical === "top" ? "6rem" : "0rem",
    md: vertical === "top" ? "6rem" : "0rem",
  };

  return (
    <>
      {severity !== "basic" ? (
        <Snackbar
          anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
          open={open}
          autoHideDuration={2400}
          onClose={handleClose}
          sx={{ width: fullWidth ? "100%" : "auto", zIndex: 2001 }}
        >
          <Alert
            onClose={handleClose}
            severity={severity !== "basic" ? severity : "error"}
            sx={{
              width: fullWidth ? "100%" : "auto",
              marginTop: marginSx,
              maxWidth: "1024px",
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
          open={open}
          autoHideDuration={2400}
          onClose={handleClose}
          sx={{
            zIndex: 2001,
            width: fullWidth ? "100%" : "auto",
            marginTop: marginSx,
            maxWidth: "1024px",
          }}
          message={message}
        />
      )}
    </>
  );
}
export default Snackbars;
