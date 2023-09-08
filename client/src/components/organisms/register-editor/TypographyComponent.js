import { Typography } from "@mui/material";

function TypographyComponent(props) {
  const { content, ...properties } = props;
  return <Typography {...properties}>{content}</Typography>;
}

export default TypographyComponent;
