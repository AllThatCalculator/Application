import { TextField } from "@mui/material";
import { PROPERTY_NAME_DARK_MODE } from "../../../constants/calculetComponent";

function TextFieldComponent(props) {
  const { helperText, maxLength, ...prop } = props;
  const { id } = prop;

  let sx = {};
  // dark mode : id, 버튼 도우미의 target
  if (
    id === PROPERTY_NAME_DARK_MODE.PROPERTY_ID ||
    id === PROPERTY_NAME_DARK_MODE.PROPERTY_OPTION_TARGET
  ) {
    sx = { bgcolor: "black", color: "white" };
  }

  return (
    <TextField
      {...props}
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true,
        sx: { textShadow: "1.2px 1.2px 0.2px white" },
      }}
      inputProps={{ maxLength: maxLength }}
      sx={{ "& .MuiOutlinedInput-root": sx }}
    />
  );
}

export default TextFieldComponent;
