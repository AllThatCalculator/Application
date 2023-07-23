import { useDrag } from "react-dnd";
import { EditorItemTypes } from "../../../constants/register";

/**
 * 에디터 컴포넌트 (drag & drop)
 * @param {*} param0
 * @returns
 */
function EditorComponent({ children, _id, component: Component }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: EditorItemTypes.EDITOR,
    item: {
      id: _id,
      component: Component,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: "Move",
      }}
    >
      {children}
    </div>
  );
}

export default EditorComponent;
