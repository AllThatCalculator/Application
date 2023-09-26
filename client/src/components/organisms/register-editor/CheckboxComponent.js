import { Checkbox, FormControlLabel } from "@mui/material";

function CheckboxComponent(props) {
  const { isProp, ...prop } = props;

  return (
    <FormControlLabel
      {...prop}
      control={
        <Checkbox
          {...prop}
          checked={Boolean(prop.value)}
          size={isProp ? "small" : "medium"}
        />
      }
      label={prop.label}
    />
  );
}

export default CheckboxComponent;
