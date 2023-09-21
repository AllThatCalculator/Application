import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PROPERTY_OPTION_START_NUMBER } from "../../../constants/calculetComponent";
import { onUpdateComponent } from "../../../modules/calculetEditor";
import { FlexBox, FlexColumnBox } from "../common/FlexBox";
import { Components, Option } from "./ComponentOptions";
import SubTitle from "../common/SubTitle";
import Transformer from "./Transformer";
import StyledScrollbar from "../../atoms/StyledScrollbar";

/**
 * 컴포넌트 type에 따라 속성을 입력하는 필드들을 모은 컴포넌트
 * @param {string} componentId 컴포넌트 UUID
 * @param {string} componentType 컴포넌트 타입
 * @returns
 */
function ComponentForm({ componentId, componentType }) {
  const dispatch = useDispatch();
  // const components = useSelector((state) => state.calculetEditor.components);
  const inputs = useSelector(
    (state) => state.calculetEditor.components[componentId]
  ); // 컴포넌트 속성에 대한 인풋값
  const [properties] = useState({
    // ...Common,
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

  return (
    <Grid container sx={{ backgroundColor: "white", p: 2 }}>
      <FlexBox gap={2}>
        <FlexColumnBox gap={1.2}>
          <SubTitle
            content="속성 입력"
            subContent="아래 요소의 속성을 입력해주세요."
          />
          {Object.entries(properties).map(([id, property], index) => {
            return (
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
            );
          })}
        </FlexColumnBox>
        {properties.options && (
          <div>
            <Divider orientation="vertical" flexItem />
            <FlexColumnBox>
              <FlexBox
                gap={1.2}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Typography variant="body1">
                  옵션 {`(${Object.entries(inputs.options).length}개)`}
                </Typography>
                <Button
                  onClick={addOption}
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                >
                  추가
                </Button>
              </FlexBox>
              <StyledScrollbar>
                <FlexColumnBox
                  gap={0.8}
                  sx={{ width: 1, maxHeight: "32rem", mt: 1.2 }}
                >
                  {Object.entries(inputs.options).map(([id, value], index) => (
                    <FlexBox
                      id={id}
                      key={index}
                      gap={0.8}
                      sx={{ alignItems: "center" }}
                    >
                      <Typography>{`${index + 1}.`}</Typography>
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
                      <Button
                        onClick={deleteOption}
                        variant="outlined"
                        size="small"
                        color="error"
                        disabled={Object.entries(inputs.options).length <= 1}
                      >
                        삭제
                      </Button>
                    </FlexBox>
                  ))}
                </FlexColumnBox>
              </StyledScrollbar>
            </FlexColumnBox>
          </div>
        )}
      </FlexBox>
    </Grid>
  );
}

export default ComponentForm;
