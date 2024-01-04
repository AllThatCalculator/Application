import { Typography } from "@mui/material";

function TypographyComponent(props) {
  const { content, ...properties } = props;
  return (
    <Typography {...properties} sx={{ wordBreak: "break-word" }}>
      {content}
    </Typography>
  );
}

export default TypographyComponent;
