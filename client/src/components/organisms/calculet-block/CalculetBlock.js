import React, { useEffect } from "react";
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
import RGL, { WidthProvider } from "react-grid-layout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ReactGridLayout = WidthProvider(RGL);

/**
 * 각 계산기 type에 따라 렌더링하는 함수
 */
function Calculet({ calculetId, srcCode, type, isPreview }) {
  const calculetInputOutput = useSelector((state) => state.calculetInputOutput);
  const { handleSetCalculetObj, handleGetCalculetRecords } =
    useCalculetRecord();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  switch (type) {
    case 0:
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
    case 1:
      // eslint-disable-next-line
      const userFunction = new Function(
        "inputObj",
        // 콘솔 객체 덮어 씌우기
        `console = ["log", "dir", "error", "warn", "assert"].reduce(function(obj, key){
          obj[key] = function(){};
          return obj;
        }, {...console});` +
          srcCode.userFunction +
          `;return main(inputObj);`
      );

      return (
        <ReactGridLayout
          compactType={null} // 왼쪽 정렬 해제
          rowHeight={64}
          cols={12}
          layout={srcCode.layout}
          isDraggable={false}
          isResizable={false}
        >
          {Object.entries(srcCode.components).map(([id, data]) => {
            // default 값 빼고 전달 - default값은 inputOutput 초기화 과정에서 설정됨
            const { defaultValue, ...rest } = data;
            if (rest.componentType === CALCULET_BUTTON) {
              rest.onClick = () => {
                const record = {
                  inputObj: calculetInputOutput,
                  outputObj: userFunction(calculetInputOutput),
                };
                dispatch(onCalculetExecute(record.outputObj));
                dispatch(onUpdateRecentInputOutput(record));
              };

              return (
                <div key={id} id={id}>
                  <Transformer id={id} data={rest} />
                </div>
              );
            }

            rest.value = calculetInputOutput[id];

            return (
              <div key={id} id={id}>
                <Transformer
                  id={id}
                  data={rest}
                  updateValue={(newValue) => {
                    dispatch(
                      onUpdateCalculetInputOutput({
                        componentId:
                          rest.componentType === INPUT_HELPER
                            ? rest.target
                            : id,
                        value: newValue,
                      })
                    );
                  }}
                />{" "}
              </div>
            );
          })}
        </ReactGridLayout>
      );
    default:
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 1) {
      dispatch(
        onSetCalculetObj({
          calculetId,
          ...Object.entries(srcCode.components).reduce(
            (obj, key) => {
              const [id, data] = key;
              if (data.isInput) {
                obj.inputObj.push(id);
                obj.labelDict[id] = data.label;
              }
              if (data.isOutput) {
                obj.outputObj.push(id);
                obj.labelDict[id] = data.label;
              }
              return obj;
            },
            { inputObj: [], outputObj: [], labelDict: {} }
          ),
        })
      );
      // 타입 검사 - 입출력 초기화
      dispatch(
        onInitCalculetInputOutput(
          Object.entries(srcCode.components).reduce((obj, key) => {
            const [id, data] = key;
            obj[id] = data.defaultValue; // 기본값 설정
            return obj;
          }, {})
        )
      );
    }
  }, [calculetId, dispatch, srcCode, type]);

  return (
    <Wrapper>
      <Calculet
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
