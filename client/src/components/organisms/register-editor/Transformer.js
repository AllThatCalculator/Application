import React from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import SelectComponent from "./SelectComponent";
import CheckboxComponent from "./CheckboxComponent";
import MultiCheckboxComponent from "./MultiCheckBoxComponent";
import CopyButton from "./CopyButton";
import {
  TEXT_FIELD,
  SELECT,
  MULTI_SELECT,
  CHECK_BOX,
  MULTI_CHECK_BOX,
} from "../../../constants/calculetComponent";

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
      case MULTI_SELECT:
        value = [];
        break;
      case CHECK_BOX:
        value = false;
        break;
      case MULTI_CHECK_BOX:
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
    case TEXT_FIELD:
      return <TextField {...properties} />;
    case SELECT:
      return <SelectComponent {...properties} />;
    case MULTI_SELECT:
      return <SelectComponent {...properties} multiple={true} />;
    case CHECK_BOX:
      return <CheckboxComponent {...properties} />;
    case MULTI_CHECK_BOX:
      return <MultiCheckboxComponent {...properties} />;
    default:
      return;
  }
}
export default React.memo(Transformer);
