import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RGL, { WidthProvider } from "react-grid-layout";
// import ReactGridLayout, { WidthProvider, Responsive } from "react-grid-layout";
// import css -- IMP!!!
import "../../../../node_modules/react-grid-layout/css/styles.css";
import "../../../../node_modules/react-resizable/css/styles.css";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { Box, Paper, Popover, Typography } from "@mui/material";
import {
  CALCULET_BUTTON,
  CHECK_BOX,
} from "../../../constants/calculetComponent";
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
import {
  MyReactGridLayout,
  getStyle,
  reactGridLayout,
} from "../common/GridLayout";

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

  // delete component
  const dispatch = useDispatch();
  function deleteComponent(componentId) {
    dispatch(onDeleteComponentLayout({ componentId }));
  }

  // 예외) 계산하기 버튼은 form 없음.
  const isCalculetButton = data.componentType === CALCULET_BUTTON;

  return (
    <div style={{ width: "100%" }}>
      <EditorComponent
        id={id}
        isCalculetButton={isCalculetButton}
        onClickOpenForm={onClickOpenEditor}
        isDelete
        onClickDelete={() => deleteComponent(id)}
      >
        <Component />
      </EditorComponent>
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

function EditorContainer({}) {
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
          style={getStyle(data.componentType)}
        >
          <AssembledEditorComponent id={id} data={data} />
        </div>
      );
    });
  }, [userEditorComp]);

  return (
    <Paper
      elevation={10}
      sx={{
        width: 1,
        bgcolor: isHovered ? "#00000014" : "white",
        transition: (theme) =>
          theme.transitions.create(["backgroundColor"], {
            duration: theme.transitions.duration.standard,
          }),
      }}
    >
      <div ref={drop} style={{ width: "100%" }}>
        <Box
          sx={{
            display: isHovered ? "block" : "none",
            transition: (theme) =>
              theme.transitions.create("display", {
                duration: theme.transitions.duration.standard,
              }),
            position: "relative",
            zIndex: 2000,
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 100%)",
            }}
          >
            <Typography variant="h5">여기에 드래그 해주세요.</Typography>
          </div>
        </Box>
        {Object.entries(userEditorComp).length !== 0 ? (
          <MyReactGridLayout
            {...reactGridLayout}
            layout={layout}
            onLayoutChange={onLayoutChange}
            draggableHandle={`.${EDITOR_ITEM_TYPES.EDITOR}`}
          >
            {gridItems}
          </MyReactGridLayout>
        ) : (
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" align="center" color="text.disabled">
              여기에 드래그 해주세요.
            </Typography>
          </Box>
        )}
      </div>
    </Paper>
  );
}
export default EditorContainer;
