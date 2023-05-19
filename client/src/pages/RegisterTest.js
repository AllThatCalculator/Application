import { useCallback, useEffect, useState } from "react";
import { PageScreenBox } from "../components/global-components/PageScreenBox";
import Transformer from "../components/register-test/Transformer";

/**
 * 계산기 심플 등록 테스트 페이지
 * - 사용자에게 입력받는 컴포넌트 정보를 testObj에 넣고, 이를 컴포넌트로 transform하는 로직
 */
function RegisterTest() {
  const [isRender, setIsRender] = useState(false);
  const [inputs, setInputs] = useState({});
  const [outputs, setOutputs] = useState({});
  const [components, setComponents] = useState([]);
  const [testObj] = useState([
    {
      isInput: true,
      isOutput: true,
      copyButton: true,
      isRequired: true,
      isDisabled: false,
      type: "STRING",
      param: {
        name: "test",
        label: "입력",
      },
    },
    {
      isInput: false,
      isOutput: true,
      copyButton: true,
      isRequired: true,
      isDisabled: false,
      type: "STRING",
      param: {
        name: "test2",
        label: "입력2",
      },
    },
  ]);

  function onInputsChange(e) {
    const { id, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  }
  function onOutputsChange(e) {
    const { id, value } = e.target;
    setOutputs((outputs) => ({ ...outputs, [id]: value }));
  }

  const transformerHandler = useCallback(() => {
    const tempInputs = inputs;
    const tempOutputs = outputs;
    const tempComponents = [];
    testObj.forEach((data) => {
      const valId = data.param.name;
      if (data.isInput) {
        tempInputs[valId] = "";
        data = {
          ...data,
          value: tempInputs[valId],
          onChange: onInputsChange,
        };
      }
      if (data.isOutput) {
        tempOutputs[valId] = "";
        data = {
          ...data,
          value: tempOutputs[valId],
          onChange: data.isInput
            ? (e) => {
                onInputsChange(e);
                onOutputsChange(e);
              }
            : onOutputsChange,
        };
      }
      tempComponents.push(data);
    });
    setInputs(tempInputs);
    setOutputs(tempOutputs);
    setComponents(tempComponents);
  }, [inputs, outputs, testObj]);

  useEffect(() => {
    if (!isRender) {
      transformerHandler();
      setIsRender(true);
    }
  }, [isRender, transformerHandler]);

  return (
    <PageScreenBox gap="2.4rem">
      {components.map((component, index) => (
        <Transformer key={index} data={component} />
      ))}
    </PageScreenBox>
  );
}
export default RegisterTest;
