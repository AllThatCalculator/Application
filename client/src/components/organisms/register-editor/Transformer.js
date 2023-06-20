import React from "react";
import { TextField } from "@mui/material";

/**
 * 사용자 입력 객체를 컴포넌트로 변환해주는 함수
 * @param {*} props
 * props: 사용자가 입력한 컴포넌트 한 개의 정보들
 */
function Transformer(props) {
  const { data } = props;
  const { isInput, isOutput, copyButton, componentType, ...options } = data;
  // console.log("추가된 컴포넌트", options);
  if (data.componentType === "textField") {
    return <TextField {...options} />;
  }
}
export default React.memo(Transformer);
