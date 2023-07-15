import { useCallback, useState } from "react";
import {
  Grid,
  FormControlLabel,
  TextField,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { Option } from "./ComponentOptions";

/**
 * 컴포넌트 속성 하나에 대한 정보를 받아서, 인풋 필드로 바꿔주는 함수
 * @param {string} id 컴포넌트 속성들의 id 값
 * @param {object} data 컴포넌트 속성에 대한 정보 (속성을 입력받는 인풋 타입이나 라벨 정보, 필수로 입력받아야 하는지 등등)
 * @param {string} value 컴포넌트 속성의 value 값
 * @param {function} onChange 컴포넌트 속성의 onChange 함수
 * @returns
 */
function TransformField({ id, data, value, onChange }) {
  switch (data.type) {
    case "string":
      return (
        <TextField
          id={id}
          label={data.name}
          value={value === undefined ? "" : value}
          onChange={onChange}
          required={data.required}
        />
      );
    case "bool":
      return (
        <FormControlLabel
          control={
            <Checkbox
              id={id}
              checked={value === undefined ? false : value}
              onChange={onChange}
            />
          }
          label={data.name}
          required={data.required}
        />
      );
    case "select":
      return (
        <Select
          name={id}
          value={value === undefined ? data.options[0].value : value}
          onChange={onChange}
          required={data.required}
        >
          {data.options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      );
    default:
      return;
  }
}

/**
 * 컴포넌트 type에 따라 속성을 입력하는 필드들을 모은 컴포넌트
 * @param {string} type 컴포넌트 타입
 * @param {object} component 컴포넌트 정보
 * @param {function} addComponent 컴포넌트 추가하는 함수
 * @param {function} deleteComponent 컴포넌트 삭제하는 함수
 * @returns
 */
function ComponentForm({ type, component, addComponent, deleteComponent }) {
  const [inputs, setInputs] = useState({}); // 컴포넌트 속성에 대한 인풋값
  const [property, setProperty] = useState({ ...component });
  const [optionIdx, setOptionIdx] = useState(0); // 단일 선택 컴포넌트에 대한 옵션 개수

  // 컴포넌트 속성 인풋 onChange 함수
  const onInputsChange = useCallback(
    (e) => {
      let { id, value } = e.target;
      if (id && property[id].type === "bool") {
        value = e.target.checked;
      } else if (id === undefined) {
        id = e.target.name;
      }
      setInputs((inputs) => ({ ...inputs, [id]: value }));
    },
    [property, setInputs]
  );

  // 속성이 유효한지 확인하는 함수
  const invalidComponentOption = useCallback(
    (data) => {
      for (const key in property) {
        if (property[key].required && !inputs[key]) {
          return false;
        }
      }
      if (!data.isInput && !data.isOutput) {
        return false;
      }
      return true;
    },
    [property, inputs]
  );

  // 옵션 추가하는 함수
  const addOption = useCallback(() => {
    setProperty((property) => ({
      ...property,
      options: [...property.options, { ...Option, id: optionIdx }],
    }));
    if (!inputs.options) {
      setInputs((inputs) => ({ ...inputs, options: {} }));
    }
    setInputs((inputs) => ({
      ...inputs,
      options: { ...inputs.options, [optionIdx]: {} },
    }));
    setOptionIdx((optionIdx) => optionIdx + 1);
  }, [inputs.options, optionIdx, setOptionIdx]);

  // 옵션 삭제하는 함수
  const deleteOption = useCallback(
    (e) => {
      const target = e.target.parentElement;
      setProperty((property) => ({
        ...property,
        options: property.options.filter((o) => o.id !== Number(target.id)),
      }));
      const { [target.id]: temp, ...rest } = inputs.options;
      setInputs((inputs) => ({ ...inputs, options: rest }));
    },
    [inputs.options]
  );

  // 옵션 onChange 함수
  const onOptionsChange = useCallback((e) => {
    const { id, value } = e.target;
    const [name, idx] = id.split(" "); // 속성 이름과 옵션 번호
    setInputs((inputs) => ({
      ...inputs,
      options: {
        ...inputs.options,
        [idx]: { ...inputs.options[idx], [name]: value },
      },
    }));
  }, []);

  console.log("속성 컴포넌트 정보", property);
  console.log("컴포넌트 옵션 정보", inputs);

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <>
        {Object.entries(property).map(([id, data], index) => (
          <TransformField
            key={index}
            id={id}
            data={data}
            value={inputs[id]}
            onChange={onInputsChange}
          />
        ))}
      </>
      {property.options && (
        <div>
          <button onClick={addOption}>옵션 추가</button>
          {property.options.map((data, index1) => (
            <div id={data.id} key={index1}>
              {Object.entries(data).map(
                ([id, data2], index2) =>
                  id !== "id" && (
                    <TransformField
                      key={`${id}${data.id}`}
                      id={`${id} ${data.id}`}
                      data={data2}
                      value={inputs.options[data.id][id]}
                      onChange={onOptionsChange}
                    />
                  )
              )}
              <button onClick={deleteOption}>옵션 삭제</button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          let data = { ...inputs, componentType: type };
          if (type !== "textField" && type !== "typography") {
            data = { ...data, isInput: true };
          }
          if (invalidComponentOption(data)) {
            addComponent(data);
          }
        }}
      >
        추가
      </button>
      <button onClick={() => deleteComponent(inputs)}>삭제</button>
    </Grid>
  );
}

export default ComponentForm;
