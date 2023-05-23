import { Slide } from "@mui/material";
import { forwardRef } from "react";

const TransitionSlide = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

export { TransitionSlide };
