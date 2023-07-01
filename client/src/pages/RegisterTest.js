import { useCallback, useState } from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import useInput from "../hooks/useInput";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import Transformer from "../components/organisms/register-editor/Transformer";
import CopyButton from "../components/organisms/register-editor/CopyButton";
import ComponentForm from "../components/organisms/register-editor/ComponentForm";
import {
  Common,
  Components,
} from "../components/organisms/register-editor/ComponentOptions";

/**
 * 계산기 심플 등록 테스트 페이지
 * - 사용자에게 입력받는 컴포넌트 정보를 객체로 바꿔서, transform하는 로직
 * - 사용자에게 입력받은 함수 문자열(functionStr)을 함수화해서 계산하기 버튼을 눌렀을 때 계산이 실행되도록 함
 */
function RegisterTest() {
  const [inputs, setInputs] = useState({}); // 입력 객체
  // const [outputs, setOutputs] = useState({}); // 출력 객체 (계산하기 후, 입력 + 출력 모두 합쳐서 저장)
  const [components, setComponents] = useState({}); // 컴포넌트 객체
  const { value: type, onChange: onChangeType } = useInput("");

  // 함수 생성 보안 경고 무시
  // eslint-disable-next-line
  const userFunction = new Function(
    "inputObj",
    `return {
      test2: inputObj.test * inputObj.test
    }`
  );

  // 계산하기
  const calculate = useCallback(
    (userFunction) => {
      const outputObj = { ...userFunction(inputs) };
      for (const output in outputObj) {
        setComponents((components) => ({
          ...components,
          [output]: { ...components[output], value: outputObj[output] },
        }));
      }

      // const fullObj = { ...inputs, ...outputObj };
      // setOutputs(fullObj);
    },
    [inputs]
  );

  // 입력 값 onChange 함수
  const onInputsChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setInputs((inputs) => ({ ...inputs, [id]: value }));
      setComponents((components) => ({
        ...components,
        [id]: {
          ...components[id],
          value: value,
          InputProps: components[id].copyButton
            ? { endAdornment: <CopyButton text={value} /> }
            : null,
        },
      }));
    },
    [setInputs, setComponents]
  );

  // 컴포넌트 추가하는 함수
  const addComponent = useCallback(
    (data) => {
      if (!data.value) {
        data = {
          ...data,
          value: "",
        };
      }

      if (data.isInput) {
        setInputs((inputs) => ({ ...inputs, [data.id]: "" }));
        data = {
          ...data,
          onChange: onInputsChange,
        };
      }
      // if (data.isOutput) {
      //   setOutputs((outputs) => ({ ...outputs, [data.id]: "" }));
      // }
      if (data.copyButton) {
        data = {
          ...data,
          InputProps: { endAdornment: <CopyButton text={data.value} /> },
        };
      }
      setComponents((components) => ({
        ...components,
        [data.id]: data,
      }));
    },
    [onInputsChange]
  );

  // 컴포넌트 삭제하는 함수
  const deleteComponent = useCallback((data) => {
    if (data.isInput) {
      setInputs((inputs) => {
        const { [data.id]: temp, ...rest } = inputs;
        return rest;
      });
    }
    // if (data.isOutput) {
    //   setOutputs((outputs) => {
    //     const { [data.id]: temp, ...rest } = outputs;
    //     return rest;
    //   });
    // }
    setComponents((components) => {
      const { [data.id]: temp, ...rest } = components;
      return rest;
    });
  }, []);

  // console.log("type", type);
  // console.log("inputs", inputs);
  // console.log("outputs", outputs);
  // console.log("components", components);

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <PageScreenBox gap="2.4rem">
        <Select value={type} onChange={onChangeType}>
          {Object.entries(Components).map(([id, data], index) => {
            return (
              <MenuItem key={index} value={id}>
                {id}
              </MenuItem>
            );
          })}
        </Select>
        {type !== "" && (
          <ComponentForm
            type={type}
            component={{ ...Common, ...Components[type] }}
            addComponent={addComponent}
            deleteComponent={deleteComponent}
          />
        )}
        {Object.entries(components).map(([id, data], index) => (
          <Transformer key={index} data={data} />
        ))}
        <button onClick={() => calculate(userFunction)}>계산하기</button>
      </PageScreenBox>
    </Grid>
  );
}
export default RegisterTest;
