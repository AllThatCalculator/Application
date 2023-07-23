import React from "react";
import { TextField } from "@mui/material";
import SelectComponent from "./SelectComponent";
import CheckboxComponent from "./CheckboxComponent";

/**
 * 사용자 입력 객체를 컴포넌트로 변환해주는 함수
 * @param {*} props
 * props: 사용자가 입력한 컴포넌트 한 개의 정보들
 */
function Transformer({ data }) {
  let { isInput, isOutput, copyButton, componentType, ...properties } = data;
  if (
    data.componentType !== "textField" &&
    data.componentType !== "typography"
  ) {
    const { InputProps, ...extra } = properties;
    properties = extra;
  }
  // console.log("추가된 컴포넌트", properties);
  switch (data.componentType) {
    case "textField":
      return <TextField {...properties} />;
    case "select":
      return <SelectComponent data={properties} />;
    case "multiSelect":
      const newData = { ...properties, multiple: true };
      return <SelectComponent data={newData} />;
    case "checkbox":
      const { label: labelData, ...rest } = properties;
      return <CheckboxComponent data={rest} label={labelData} />;
    default:
      return;
  }
}
export default React.memo(Transformer);
