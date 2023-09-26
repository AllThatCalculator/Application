import { useState } from "react";
import ComponentForm from "./ComponentForm";
import Transformer from "./Transformer";
import { Popover } from "@mui/material";

function ComponentEditor({ id, data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  return (
    <>
      {/* 실제 컴포넌트 */}
      <Transformer id={id} data={data} />
      <Popover
        id={popoverId}
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
