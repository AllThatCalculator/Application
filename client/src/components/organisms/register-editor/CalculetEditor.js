import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { onAppendNewComponent } from "../../../modules/calculetEditor";
import { MenuItem, Select } from "@mui/material";
import ComponentEditor from "./ComponentEditor";
import { Components } from "./ComponentOptions";
import useInput from "../../../hooks/useInput";

function CalculetEditor({ initInputs }) {
  const { components } = useSelector((state) => state.calculetEditor);
  const dispatch = useDispatch();
  const { value: componentType, onChange: onChangeComponentType } =
    useInput("");

  // redux에 정보 추가하는 함수
  function addNewComponent(componentType) {
    const componentId = uuidv4();
    dispatch(onAppendNewComponent({ componentId, componentType }));
  }

  return (
    <>
      <Select value={componentType} onChange={onChangeComponentType}>
        {Object.entries(Components).map(([id, data], index) => {
          return (
            <MenuItem key={index} value={id}>
              {id}
            </MenuItem>
          );
        })}
      </Select>
      <button onClick={() => addNewComponent(componentType)}>추가하기</button>
      {Object.entries(components).map(([id, data]) => {
        return <ComponentEditor key={id} id={id} data={data} />;
      })}
    </>
  );
}

export default CalculetEditor;
