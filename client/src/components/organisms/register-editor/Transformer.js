import React, { useCallback } from "react";
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
  DATE_PICKER,
  PROPERTY_TYPE_STRING,
  PROPERTY_TYPE_DATE,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_SELECT,
} from "../../../constants/calculetComponent";
import SelectComponent from "./SelectComponent";
import CheckboxComponent from "./CheckboxComponent";
import MultiCheckboxComponent from "./MultiCheckBoxComponent";
import CopyButton from "./CopyButton";
import RadioComponent from "./RadioComponent";
import InputHelperComponent from "./InputHelperComponent";
import CalculetButtonComponent from "./CalculetButtonComponent";
import TypographyComponent from "./TypographyComponent";
import DatePickerComponent from "./DatePickerComponent";
import TextFieldComponent from "./TextFieldComponent";

/**
 * 사용자 입력 객체를 컴포넌트로 변환해주는 함수
 * @param {*} data 컴포넌트 정보
 * @param {*} updateValue 유저의 입력에 따라 store를 업데이트 하는 함수.
 * props: 사용자가 입력한 컴포넌트 한 개의 정보들
 */
function Transformer({ data, updateValue }) {
  let {
    componentId,
    isInput,
    isOutput,
    copyButton,
    componentType,
    defaultValue,
    value,
    onChange,
    ...properties
  } = data;

  if (!value) {
    if (defaultValue === undefined) {
      defaultValue = "";
    }
    value = defaultValue;
  }
  properties.value = value;

  // onChange 초기화
  const newOnChange = useCallback(
    (e) => {
      if (!onChange && updateValue) {
        switch (componentType) {
          case TEXT_FIELD:
          case SELECT:
          case MULTI_SELECT:
          case RADIO:
          case PROPERTY_TYPE_STRING:
          case PROPERTY_TYPE_SELECT:
            updateValue(e.target.value);
            break;
          case DATE_PICKER:
          case PROPERTY_TYPE_DATE:
            updateValue(e);
            break;
          case CHECK_BOX:
          case PROPERTY_TYPE_BOOLEAN:
            updateValue(e.target.checked);
            break;
          case MULTI_CHECK_BOX:
            updateValue({
              ...properties.value,
              [e.target.name]: e.target.checked,
            });
            break;
          default:
            break;
        }
      } else if (onChange instanceof Function) {
        onChange(e);
      }
    },
    [componentType, onChange, properties.value, updateValue]
  );

  if (newOnChange instanceof Function) {
    properties.onChange = newOnChange;
  }

  if (data.copyButton) {
    properties.InputProps = {
      endAdornment: <CopyButton text={properties.value} />,
    };
  }

  switch (data.componentType) {
    case TYPOGRAPHY:
      return <TypographyComponent {...properties} />;
    case TEXT_FIELD:
      return <TextField fullWidth {...properties} />;
    case PROPERTY_TYPE_STRING:
      return <TextFieldComponent {...properties} />;
    case DATE_PICKER:
      return <DatePickerComponent {...properties} />;
    case PROPERTY_TYPE_DATE:
      return <DatePickerComponent isProp {...properties} />;
    case SELECT:
      return <SelectComponent {...properties} />;
    case PROPERTY_TYPE_SELECT:
      return <SelectComponent isProp {...properties} />;
    case MULTI_SELECT:
      return <SelectComponent multiple {...properties} />;
    case CHECK_BOX:
      return <CheckboxComponent {...properties} />;
    case PROPERTY_TYPE_BOOLEAN:
      return <CheckboxComponent isProp {...properties} />;
    case MULTI_CHECK_BOX:
      return <MultiCheckboxComponent {...properties} />;
    case RADIO:
      return <RadioComponent {...properties} />;
    case INPUT_HELPER:
      return <InputHelperComponent {...properties} updateValue={updateValue} />;
    case CALCULET_BUTTON:
      return <CalculetButtonComponent {...properties} />;
    default:
      return;
  }
}
export default React.memo(Transformer);
