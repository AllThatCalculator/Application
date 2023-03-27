import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

/**
 * 비밀번호 입력창
 * @param {*} param0
 * @returns
 */
function StyledPwTextField({
  fullWidth = true,
  required = false,
  id,
  label,
  value,
  handleOnChange,
  error = false,
  helperText = "",
}) {
  const helperTextError = error && !!helperText ? helperText : ""; // 에러 설명
  const helperTextGuide = !error && !!helperText ? helperText : ""; // 설명

  const [isShow, setIsShow] = useState(false);
  function handleOnChangeIsShow() {
    setIsShow((pre) => !pre);
  }

  return (
    <FormControl fullWidth={fullWidth} error={error} required={required}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        onChange={handleOnChange}
        type={isShow ? "text" : "password"}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleOnChangeIsShow} edge="end">
              {isShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>
        {(!!helperTextError || !!helperTextGuide) &&
          `${helperTextError} ${helperTextGuide}`}
      </FormHelperText>
    </FormControl>
  );
}
export default StyledPwTextField;
