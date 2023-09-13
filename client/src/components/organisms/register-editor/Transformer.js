import React from "react";
// import { useEffect } from "react";
import { TextField } from "@mui/material";
import {
  TEXT_FIELD,
  SELECT,
  MULTI_SELECT,
  CHECK_BOX,
  MULTI_CHECK_BOX,
  RADIO,
  INPUT_HELPER,
  CALCULET_BUTTON,
  TYPOGRAPHY,
  // DATE_PICKER,
} from "../../../constants/calculetComponent";
import SelectComponent from "./SelectComponent";
import CheckboxComponent from "./CheckboxComponent";
import MultiCheckboxComponent from "./MultiCheckBoxComponent";
import CopyButton from "./CopyButton";
import RadioComponent from "./RadioComponent";
import InputHelperComponent from "./InputHelperComponent";
import CalculetButtonComponent from "./CalculetButtonComponent";
import TypographyComponent from "./TypographyComponent";
// import DatePickerComponent from "./DatePickerComponent";

/**
 * 사용자 입력 객체를 컴포넌트로 변환해주는 함수
 * @param {*} data 컴포넌트 정보
 * @param {*} value 값
 * @param {*} updateValue 유저의 입력에 따라 store를 업데이트 하는 함수.
 * props: 사용자가 입력한 컴포넌트 한 개의 정보들
 */
function Transformer({ data, value, updateValue }) {
  let {
    componentId,
    isInput,
    isOutput,
    copyButton,
    componentType,
    ...properties
  } = data;

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
      // onChange: onChange,
    };
  }
  if (data.copyButton) {
    properties = {
      ...properties,
      InputProps: { endAdornment: <CopyButton text={properties.value} /> },
    };
  }
  properties.value = value;

  switch (data.componentType) {
    case TYPOGRAPHY:
      return <TypographyComponent {...properties} />;
    case TEXT_FIELD:
      return (
        <TextField
          {...properties}
          // 유저의 입력값 변화시 store를 업데이트 해줘야 함
          onChange={(e) => {
            updateValue(e.target.value);
          }}
        />
      );
    // case DATE_PICKER:
    //   return <DatePickerComponent {...properties} />;
    case SELECT:
      return <SelectComponent {...properties} />;
    case MULTI_SELECT:
      return <SelectComponent {...properties} multiple={true} />;
    case CHECK_BOX:
      return <CheckboxComponent {...properties} />;
    case MULTI_CHECK_BOX:
      return <MultiCheckboxComponent {...properties} />;
    case RADIO:
      return <RadioComponent {...properties} />;
    case INPUT_HELPER:
      return <InputHelperComponent {...properties} />;
    case CALCULET_BUTTON:
      return <CalculetButtonComponent {...properties} />;
    default:
      return;
  }
}
export default React.memo(Transformer);
