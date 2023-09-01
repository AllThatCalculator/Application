import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";

function MultiCheckboxComponent({ data }) {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{data.label}</FormLabel>
      <FormGroup>
        {Object.entries(data.options).map(([id, option], index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                id={data.id}
                onChange={data.onChange}
                name={option.value}
                checked={data.value[option.value]}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default MultiCheckboxComponent;
