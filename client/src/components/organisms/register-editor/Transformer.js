import React from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import SelectComponent from "./SelectComponent";
import CheckboxComponent from "./CheckboxComponent";
import MultiCheckboxComponent from "./MultiCheckBoxComponent";
import CopyButton from "./CopyButton";

/**
 * 사용자 입력 객체를 컴포넌트로 변환해주는 함수
 * @param {*} props
 * props: 사용자가 입력한 컴포넌트 한 개의 정보들
 */
function Transformer({ data, onChange, initInputs }) {
  let {
    componentId,
    isInput,
    isOutput,
    copyButton,
    componentType,
    ...properties
  } = data;
  let value = data.value;
  if (!value) {
    switch (data.componentType) {
      case "multiSelect":
        value = [];
        break;
      case "checkbox":
        value = false;
        break;
      case "multiCheckbox":
        value = {};
        for (const key in data.options) {
          value = {
            ...value,
            [data.options[key].value]: false,
          };
        }
        break;
      default:
        value = "";
        break;
    }
    properties = {
      ...properties,
      value: value,
    };
  }
  if (data.isInput) {
    properties = {
      ...properties,
      onChange: onChange,
    };
  }
  if (data.copyButton) {
    properties = {
      ...properties,
      InputProps: { endAdornment: <CopyButton text={properties.value} /> },
    };
  }

  useEffect(() => {
    if (data.isInput) {
      initInputs(data.id, value);
    }
  }, [data.id, data.isInput, initInputs, value]);

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
    case "multiCheckbox":
      return <MultiCheckboxComponent data={properties} />;
    default:
      return;
  }
}
export default React.memo(Transformer);
