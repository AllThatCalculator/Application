import { Checkbox, FormControlLabel } from "@mui/material";

function CheckboxComponent({ data, label }) {
  return (
    <FormControlLabel
      control={<Checkbox {...data} checked={data.value} />}
      label={label}
    />
  );
}

export default CheckboxComponent;
