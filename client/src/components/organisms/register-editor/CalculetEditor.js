import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { onAppendNewComponent } from "../../../modules/calculetEditor";
import { Components } from "./ComponentOptions";
import { MenuItem, Select } from "@mui/material";
import useInput from "../../../hooks/useInput";
import ComponentEditor from "./ComponentEditor";

function CalculetEditor({ initInputs }) {
  const { components } = useSelector((state) => state.calculetEditor);
  const dispatch = useDispatch();
  const { value: componentType, onChange: onChangeComponentType } =
    useInput("");

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
