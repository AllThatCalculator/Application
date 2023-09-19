import { Checkbox, FormControlLabel } from "@mui/material";

function CheckboxComponent(props) {
  return (
    <FormControlLabel
      {...props}
      control={<Checkbox checked={Boolean(props.value)} />}
    />
  );
}

export default CheckboxComponent;
