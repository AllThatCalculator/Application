import { Popover } from "@mui/material";
import ComponentForm from "./ComponentForm";
import Transformer from "./Transformer";
import { useState } from "react";

function ComponentEditor({ id, data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  return (
    <>
      {/* 실제 컴포넌트 */}
      <Transformer id={id} data={data} />
      {/* 속성 입력창 */}
      <div onClick={handleClick}>더보기</div>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ComponentForm componentId={id} componentType={data.componentType} />
      </Popover>
    </>
  );
}

export default ComponentEditor;
