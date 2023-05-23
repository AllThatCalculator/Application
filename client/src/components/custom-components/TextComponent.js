import React from "react";
import { TextField } from "@mui/material";

/**
 * 텍스트 필드 커스텀 컴포넌트
 * @param {*} props
 * props: 사용자가 입력한 텍스트 컴포넌트에 관한 정보들
 * @returns
 */
const TextComponent = React.memo(function TextComponent(props) {
  return (
    <TextField
      id={props.param.name}
      label={props.param.label}
      defaultValue={props.value}
      onChange={props.onChange}
      required={props.isRequired}
      disabled={props.isDisabled}
    />
  );
});

export default TextComponent;
