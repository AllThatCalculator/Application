import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import useCalculetRecord from "../../../hooks/useCalculetRecord";
import { setCalculetInOutputObj } from "../../../utils/setCalculetInOutputObj";
import CalculetManual from "./CalculetManual";
import CalculetSkeleton from "./CalculetSkeleton";
import { useState } from "react";
import Transformer from "../register-editor/Transformer";
import { useDispatch, useSelector } from "react-redux";
import {
  onCalculetExecute,
  onInitCalculetInputOutput,
  onUpdateCalculetInputOutput,
} from "../../../modules/calculetInputOutput";
import {
  onSetCalculetObj,
  onUpdateRecentInputOutput,
} from "../../../modules/calculetRecord";
import {
  CALCULET_BUTTON,
  INPUT_HELPER,
} from "../../../constants/calculetComponent";
import {
  MyReactGridLayout,
  getStyle,
  reactGridLayout,
} from "../common/GridLayout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

function CalculetV0({ calculetId, srcCode, isPreview }) {
  const { handleSetCalculetObj, handleGetCalculetRecords } =
    useCalculetRecord();
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 1. iframe 높이 조절
   * 2. 기록을 위한 입출력 정보 초기화
   * @param {event object} e
   */
  function onLoad(e) {
    const frame = e.target;
    frame.style.width = "100%";
    frame.style.height = `${frame.contentDocument.body.scrollHeight}px`;
    // get input&output object and record list
    handleSetCalculetObj({
      calculetId,
      ...setCalculetInOutputObj(),
    });

    // 미리보기면 return
    if (!isPreview) {
      handleGetCalculetRecords(calculetId);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <CalculetSkeleton />}
      <iframe
        srcDoc={
          `<link href="/static-files/css/calculet.css" rel="stylesheet">
                    <link href="/static-files/css/font.css" rel="stylesheet">
                    <style>
                      * {
                        padding: 0px;
                        margin: 0px;
                      }
                    </style>
                ` + srcCode
        }
        style={{ width: "100%", border: "none", overflow: "auto" }}
        onLoad={(e) => onLoad(e)}
        title="calculet"
        id="calculetIframe"
      />
    </>
  );
}

function CalculetV1({ calculetId, srcCode, isPreview }) {
  const calculetInputOutput = useSelector((state) => state.calculetInputOutput);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userFunction =
    // eslint-disable-next-line
    Function(
      "temp",
      "inputObj",
      // preview가 아닌 경우 -> 콘솔 객체 덮어 씌우기
      (isPreview
        ? ""
        : `const console = temp.reduce((obj, key) => {
        obj[key] = function(){};
        return obj;
      }, {})
      delete temp;
      `) +
        // override document
        `;const document = null;` +
        srcCode.userFunction +
        `;return main(inputObj);`
    );

  useEffect(() => {
    // 계산 기록 위한 calculetObj 초기화
    dispatch(
      onSetCalculetObj({
        calculetId,
        ...Object.entries(srcCode.components).reduce(
          (obj, key) => {
            const [id, data] = key;
            if (data.isInput) {
              obj.inputObj.push(id);
              obj.idToLabel[id] = data.label;
            }
            if (data.isOutput) {
              obj.outputObj.push(id);
              obj.idToLabel[id] = data.label;
            }
            if ((data.isInput || data.isOutput) && data.options) {
              obj.valueToLabel[id] = Object.values(data.options).reduce(
                (accumulator, data) => {
                  return { ...accumulator, [data.value]: data.label };
                },
                {}
              );
            }
            return obj;
          },
          { inputObj: [], outputObj: [], idToLabel: {}, valueToLabel: {} }
        ),
      })
    );
    // 타입 검사 - 입출력 초기화
    dispatch(
      onInitCalculetInputOutput(
        Object.values(srcCode.components).reduce((obj, data) => {
          if (data.isInput || data.isOutput) {
            obj[data.componentId] = data.defaultValue; // 기본값 설정
          }
          return obj;
        }, {})
      )
    );

    setIsLoading(false);
  }, [calculetId, dispatch, srcCode, isLoading]);

  const calculate = useCallback(
    (calculetInput) => {
      // 계산기에 넘겨줄 input 가공: componentId -> id
      const input = Object.entries(calculetInput).reduce(
        (input, [componentId, value]) => {
          if (srcCode.components[componentId].isInput) {
            input[srcCode.components[componentId].id] = value;
          }
          return input;
        },
        {}
      );

      // user id를 componentId로 바꿔주기 위한 사전
      const idToComponentId = Object.values(srcCode.components).reduce(
        (accumulator, data) => {
          if (data.isOutput) {
            accumulator[data.id] = data.componentId;
          }
          return accumulator;
        },
        {}
      );

      let output;

      try {
        // 1. 연산 수행
        // 2. 계산기로부터 받은 output 가공: id -> componentId
        output = Object.entries(
          userFunction(Object.keys(console), input)
        ).reduce((output, [id, value]) => {
          // 찾아야지...
          output[idToComponentId[id]] = value;
          return output;
        }, {});
      } catch (error) {
        output = {};
      }

      // 기록 객체
      const record = {
        inputObj: calculetInput,
        outputObj: output,
      };

      dispatch(onCalculetExecute(output));
      dispatch(onUpdateRecentInputOutput(record));
    },
    [dispatch, userFunction, srcCode.components]
  );

  return (
    <MyReactGridLayout
      {...reactGridLayout}
      layout={srcCode.layout}
      isDraggable={false}
      isResizable={false}
    >
      {isLoading && <CalculetSkeleton />}
      {!isLoading &&
        Object.entries(srcCode.components).map(([id, data]) => {
          // default 값 빼고 전달 - default값은 inputOutput 초기화 과정에서 설정됨
          const { defaultValue, ...rest } = data;
          if (rest.componentType === CALCULET_BUTTON) {
            rest.onClick = () => calculate(calculetInputOutput);
            return (
              <div key={id} id={id} style={getStyle(rest.componentType)}>
                <Transformer id={id} data={rest} />
              </div>
            );
          }

          rest.value = calculetInputOutput[id];
          const updateValue = (newValue) => {
            dispatch(
              onUpdateCalculetInputOutput({
                componentId:
                  rest.componentType === INPUT_HELPER ? rest.target : id,
                value: newValue,
              })
            );
          };

          return (
            <Transformer
              id={id}
              data={rest}
              key={id}
              updateValue={updateValue}
            />
          );
        })}
    </MyReactGridLayout>
  );
}

/**
 * 계산기 라우터 - 각 계산기 type에 따라 렌더링
 * @param {object} props
 */
function CalculetRouter(props) {
  const { type, ...info } = props;
  switch (type) {
    case 0:
      return <CalculetV0 {...info} />;
    case 1:
      return <CalculetV1 {...info} srcCode={JSON.parse(props.srcCode)} />;
    default:
      return <></>;
  }
}

/**
 *
 * @param {string} srcCode - 계산기 소스코드
 * @param {string} manual - 계산기 설명 마크다운
 * @param {string} calculetId - 계산기 번호
 * @param {bool} isPreview - 미리보기인지
 */
function CalculetBlock({
  srcCode,
  manual,
  calculetId,
  isPreview = false,
  type,
}) {
  return (
    <Wrapper>
      <CalculetRouter
        calculetId={calculetId}
        srcCode={srcCode}
        type={type}
        isPreview={isPreview}
      />
      <CalculetManual
        content={manual}
        calculetId={calculetId}
        isPreview={isPreview}
        type={type}
      />
    </Wrapper>
  );
}
export default React.memo(CalculetBlock);
