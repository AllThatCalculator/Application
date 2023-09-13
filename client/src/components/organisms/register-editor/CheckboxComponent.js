import { Checkbox, FormControlLabel } from "@mui/material";

function CheckboxComponent(props) {
  return (
    <FormControlLabel
      control={<Checkbox {...props} checked={props.value} />}
      label={props.label}
    />
  );
}

export default CheckboxComponent;
