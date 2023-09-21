import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RGL, { WidthProvider } from "react-grid-layout";
// import ReactGridLayout, { WidthProvider, Responsive } from "react-grid-layout";
// import css -- IMP!!!
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { Popover, Typography } from "@mui/material";
import { CALCULET_BUTTON } from "../../../constants/calculetComponent";
import { ComponentSizes } from "../register-editor/ComponentSize";
import { EDITOR_ITEM_TYPES } from "../../../constants/register";
import ComponentForm from "../register-editor/ComponentForm";
import Transformer from "../register-editor/Transformer";
import EditorComponent from "./EditorComponent";
import {
  onAppendNewComponent,
  onDeleteComponentLayout,
  onUpdateLayout,
} from "../../../modules/calculetEditor";

/**
 * component + balloon edit
 */
function AssembledEditorComponent({ id, data }) {
  // balloon editor state
  const [anchorEl, setAnchorEl] = useState(null);
  function onClickOpenEditor(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleCloseEditor() {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);

  // component
  function Component() {
    return <Transformer id={id} data={data} />;
  }

  // 예외) 계산하기 버튼은 form 없음.
  const isCalculetButton = data.componentType === CALCULET_BUTTON;

  return (
    <div>
      <span className={`${EDITOR_ITEM_TYPES.EDITOR}`}>
        <EditorComponent
          id={id}
          onClickDragIndicator={onClickOpenEditor}
          tooltip={`드래그해서 옮기기${
            isCalculetButton ? `` : ` \n클릭해서 편집하기`
          }`}
        >
          <Component />
        </EditorComponent>
      </span>
      {!isCalculetButton && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseEditor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ComponentForm componentId={id} componentType={data.componentType} />
        </Popover>
      )}
    </div>
  );
}

const ReactGridLayout = WidthProvider(RGL);
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

function EditorContainer() {
  const dispatch = useDispatch();
  const { components: userEditorComp, layout } = useSelector(
    (state) => state.calculetEditor
  );
  // redux function
  function onLayoutChange(layout) {
    // console.log(layout);
    dispatch(onUpdateLayout(layout));
  }
  function addNewComponent(componentType) {
    const componentId = uuidv4();
    dispatch(onAppendNewComponent({ componentId, componentType }));
  }
  function deleteComponent(componentId) {
    dispatch(onDeleteComponentLayout({ componentId }));
  }

  const [{ isHovered }, drop] = useDrop(() => ({
    accept: EDITOR_ITEM_TYPES.EDITOR,
    drop: (data, monitor) => {
      addNewComponent(data.componentType);
    },
    collect: (monitor) => ({
      isHovered: monitor.isOver({ shallow: true }),
    }),
  }));

  const gridItems = useMemo(() => {
    return Object.entries(userEditorComp).map(([id, data], index) => {
      return (
        <div
          key={id}
          data-grid={{
            ...ComponentSizes[data.componentType],
            x: 0,
            y: 0, // puts it at the bottom
          }}
        >
          <span className="remove" onClick={() => deleteComponent(id)}>
            x
          </span>
          <AssembledEditorComponent id={id} data={data} />
        </div>
      );
    });
  }, [userEditorComp]);

  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        // height: 64,
        padding: 4,
      }}
    >
      <div
        style={{
          display: isHovered ? "block" : "none",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            // top: "50%",
            transform: "translate(-50%, 250%)",
          }}
        >
          <Typography variant="h5">여기에 드래그 해주세요.</Typography>
        </div>
      </div>
      <ReactGridLayout
        compactType={null} // 왼쪽 정렬 해제
        rowHeight={64}
        cols={12}
        // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        onLayoutChange={onLayoutChange}
        draggableHandle={`.${EDITOR_ITEM_TYPES.EDITOR}`}
      >
        {Object.entries(userEditorComp).length !== 0 ? (
          gridItems
        ) : (
          <div style={{ height: 200 }}></div>
        )}
      </ReactGridLayout>
    </div>
  );
}
export default EditorContainer;
