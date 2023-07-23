import { useState } from "react";
import { useDrop } from "react-dnd";
import RGL, { WidthProvider } from "react-grid-layout";
import { EditorItemTypes } from "../../../constants/register";
import EditorComponent from "./EditorComponent";
//  import css -- IMP!!!
// import "../../../../node_modules/react-grid-layout/css/styles.css";
// import "../../../../node_modules/react-resizable/css/styles.css";
// import './Content.css'

const ReactGridLayout = WidthProvider(RGL);

function EditorContent(props) {
  const { change } = props;

  const [row, setRow] = useState([]);
  const [layout, setLayout] = useState([
    // { i: 1, x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1 }, // *** -- minH & maxH doesnt effect the grid items
    // { i: 2, x: 2, y: 0, w: 1, h: 1, minH: 1, maxH: 1 },
    // // {i: '3', x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1},
    // // {i: '4', x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1}
  ]);
  console.log("layout>>>", layout);

  const [resizeplotly, setResizePlotly] = useState(false);
  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  const onResize = (layouts) => {
    setLayout(layouts);
  };

  //   // use drop
  //   const [{ isOver, canDrop }, drop] = useDrop(() => ({
  //     accept: EditorItemTypes.EDITOR,
  //     canDrop: () => {},
  //     drop: (item, monitor) => {
  //       console.log(item);
  //       if (row.length < 4) {
  //         setRow((old) => {
  //           console.log("old>>>", old);
  //           // 여기서 드래그 돼서 들어온 컴포넌트가 바뀜
  //           change([...old, { id: item.id, component: item.component }]);
  //           return [...old, { id: item.id, component: item.component }];
  //         });
  //       } else {
  //         alert("Maximum 4 items allowed on a row");
  //       }
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //       canDrop: !!monitor.canDrop(),
  //     }),
  //   }));

  const [collectedProps, drop] = useDrop(() => ({
    accept: EditorItemTypes.EDITOR,
    drop: (content, monitor) => {
      const { component: Component, id } = content;

      if (row.length < 12) {
        setRow((old) => {
          // 드래그 돼서 들어온 컴포넌트가 추가됨.
          change([...old, { id: id, component: Component }]);
          return [...old, { id: id, component: Component }];
        });
      } else {
        alert("Maximum 4 items allowed on a row");
      }
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        maxWidth: "100%",
        // height: 64,
        backgroundColor: "#fff",
        padding: 4,
      }}
    >
      <ReactGridLayout
        compactType={"horizontal"}
        rowHeight={64}
        cols={12}
        onResize={onResize}
        // width={100}
        layout={layout}
        onLayoutChange={onLayoutChange}
        // draggableHandle=".MyDragHandleClassName"
        draggableCancel=".MyDragCancel"
        isBounded={true}
      >
        {row.length !== 0 ? (
          row.map((content, index) => {
            const { component: Component, id } = content;
            return (
              <div key={`${id}-${index}`}>
                <EditorComponent _id={id} component={Component}>
                  <Component />
                </EditorComponent>
              </div>
            );
          })
        ) : (
          <div style={{ height: 200 }}></div>
        )}
      </ReactGridLayout>
    </div>
  );
}
export default EditorContent;
