import React from "react";
import { useCallback } from "react";
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

  // value 초기화
  if (!value) {
    switch (componentType) {
      case MULTI_SELECT:
        value = [];
        break;
      case CHECK_BOX:
      case PROPERTY_TYPE_BOOLEAN:
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
      case DATE_PICKER:
      case PROPERTY_TYPE_DATE:
        value = null;
        break;
      default:
        value = "";
        break;
    }
    if (defaultValue) {
      // 만약 기본값이 있다면 기본값 사용
      value = defaultValue;
    }
  }
  properties.value = value;

  // 다양한 onChange 함수들
  const onValueChange = useCallback(
    (e) => {
      if (!updateValue) {
        return;
      }
      updateValue(e.target.value);
    },
    [updateValue]
  );

  const onEventChange = useCallback(
    (e) => {
      if (!updateValue) {
        return;
      }
      updateValue(e);
    },
    [updateValue]
  );

  const onCheckChange = useCallback(
    (e) => {
      if (!updateValue) {
        return;
      }
      updateValue(e.target.checked);
    },
    [updateValue]
  );

  const onMultiCheckChange = useCallback(
    (e) => {
      if (!updateValue) {
        return;
      }
      updateValue({
        ...value,
        [e.target.name]: e.target.checked,
      });
    },
    [value, updateValue]
  );

  // onChange 초기화
  if (!onChange) {
    switch (componentType) {
      case TEXT_FIELD:
      case SELECT:
      case MULTI_SELECT:
      case RADIO:
      case PROPERTY_TYPE_STRING:
      case PROPERTY_TYPE_SELECT:
        onChange = onValueChange;
        break;
      case DATE_PICKER:
      case PROPERTY_TYPE_DATE:
        onChange = onEventChange;
        break;
      case CHECK_BOX:
      case PROPERTY_TYPE_BOOLEAN:
        onChange = onCheckChange;
        break;
      case MULTI_CHECK_BOX:
        onChange = onMultiCheckChange;
        break;
      default:
        break;
    }
  }
  properties.onChange = onChange;

  if (data.copyButton) {
    properties.InputProps = {
      endAdornment: <CopyButton text={properties.value} />,
    };
  }

  switch (data.componentType) {
    case TYPOGRAPHY:
      return <TypographyComponent {...properties} />;
    case TEXT_FIELD:
    case PROPERTY_TYPE_STRING:
      return <TextField {...properties} />;
    case DATE_PICKER:
    case PROPERTY_TYPE_DATE:
      return <DatePickerComponent {...properties} />;
    case SELECT:
    case PROPERTY_TYPE_SELECT:
      return <SelectComponent {...properties} />;
    case MULTI_SELECT:
      return <SelectComponent {...properties} multiple={true} />;
    case CHECK_BOX:
    case PROPERTY_TYPE_BOOLEAN:
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
