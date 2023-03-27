import { TextField } from "@mui/material";

function StyledTextField({
  fullWidth = true,
  id,
  label,
  value,
  handleOnChange,
  maxLength = false,
  error = false,
  helperText = "",
  disabled = false,
  maxRows = false,
}) {
  const helperTextError = error && !!helperText ? helperText : ""; // 에러 설명
  const helperTextGuide = !error && !!helperText ? helperText : ""; // 설명
  const helperTextLength = !!maxLength ? `${value.length}/${maxLength}` : "";

  return (
    <TextField
      fullWidth={fullWidth}
      disabled={disabled}
      id={id}
      label={label}
      value={value}
      onChange={handleOnChange}
      inputProps={{
        maxLength: maxLength ? maxLength : null,
      }}
      helperText={
        (!!helperTextError || !!helperTextLength || !!helperTextGuide) &&
        `${helperTextError} ${helperTextLength} ${helperTextGuide}`
      }
      error={error}
      multiline={!!maxRows}
      maxRows={maxRows ? maxRows : null}
    />
  );
}
export default StyledTextField;
