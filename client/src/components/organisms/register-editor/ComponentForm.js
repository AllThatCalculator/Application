import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import { Common, Components, Option } from "./ComponentOptions";
import { onUpdateComponent } from "../../../modules/calculetEditor";
import { PROPERTY_OPTION_START_NUMBER } from "../../../constants/calculetComponent";

import Transformer from "./Transformer";
import {
  validateAllComponents,
  validateOneComponent,
} from "./validateComponentProperties";

/**
 * 컴포넌트 type에 따라 속성을 입력하는 필드들을 모은 컴포넌트
 * @param {string} componentId 컴포넌트 UUID
 * @param {string} componentType 컴포넌트 타입
 * @returns
 */
function ComponentForm({ componentId, componentType }) {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.calculetEditor.components);
  const inputs = useSelector(
    (state) => state.calculetEditor.components[componentId]
  ); // 컴포넌트 속성에 대한 인풋값
  const [properties] = useState({
    ...Common,
    ...Components[componentType],
  });
  const [optionIdx, setOptionIdx] = useState(PROPERTY_OPTION_START_NUMBER + 1); // 단일 선택 컴포넌트에 대한 옵션 개수

  useEffect(() => {
    // option이 있는 컴포넌트의 optionIdx 값 초기화
    if (properties.options) {
      const inputOptions = Object.keys(inputs.options);
      const lastOptionNum = Number(inputOptions[inputOptions.length - 1]);
      setOptionIdx((optionIdx) => lastOptionNum + 1);
    }
  }, [inputs.options, properties.options]);

  // 속성이 유효한지 확인하는 함수
  const invalidComponentOption = useCallback(() => {
    for (const key in components) {
      console.log(
        components[key].id,
        validateOneComponent(components, components[key])
      );
    }
    console.log("all", validateAllComponents(components));
  }, [components]);

  // 옵션 추가하는 함수
  const addOption = useCallback(() => {
    dispatch(
      onUpdateComponent({
        componentId,
        targetId: "options",
        value: { ...inputs.options, [optionIdx]: {} },
      })
    );

    setOptionIdx((optionIdx) => optionIdx + 1);
  }, [inputs.options, optionIdx, setOptionIdx, componentId, dispatch]);

  // 옵션 삭제하는 함수
  const deleteOption = useCallback(
    (e) => {
      const target = e.target.parentElement;
      const { [target.id]: temp, ...rest } = inputs.options;
      dispatch(
        onUpdateComponent({ componentId, targetId: "options", value: rest })
      );
    },
    [inputs.options, componentId, dispatch]
  );

  // 옵션 onChange 함수
  const onOptionsChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      const [name, idx] = id.split(" "); // 속성 이름과 옵션 번호

      dispatch(
        onUpdateComponent({
          componentId,
          targetId: "options",
          value: {
            ...inputs.options,
            [idx]: { ...inputs.options[idx], [name]: value },
          },
        })
      );
    },
    [inputs.options, componentId, dispatch]
  );

  // console.log("속성 컴포넌트 정보", properties);
  // console.log("컴포넌트 옵션 정보", inputs);
  invalidComponentOption();

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <>
        {Object.entries(properties).map(([id, property], index) => (
          <Transformer
            data={{ ...property, id: id, value: inputs[id] }}
            key={index}
            updateValue={(newValue) => {
              dispatch(
                onUpdateComponent({
                  componentId,
                  targetId: id,
                  value: newValue,
                })
              );
            }}
          />
        ))}
      </>
      {properties.options && (
        <div>
          <button onClick={addOption}>옵션 추가</button>
          {Object.entries(inputs.options).map(([id, value], index) => (
            <div id={id} key={index}>
              {Object.entries(Option).map(([key, optionProperty]) => (
                <Transformer
                  data={{
                    ...optionProperty,
                    id: `${key} ${id}`,
                    value: inputs.options[id][key],
                    onChange: onOptionsChange,
                  }}
                  key={`${key}${id}`}
                />
              ))}
              <button onClick={deleteOption}>옵션 삭제</button>
            </div>
          ))}
        </div>
      )}
    </Grid>
  );
}

export default ComponentForm;
