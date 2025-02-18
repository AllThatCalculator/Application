import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormControl,
} from "@mui/material";

function MultiCheckboxComponent(props) {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" {...props}>
        {props.label}
      </FormLabel>
      <FormGroup>
        {Object.entries(props.options).map(([id, option], index) => (
          <FormControlLabel
            key={index}
            disabled={Boolean(props.disabled)}
            control={
              <Checkbox
                id={props.id}
                onChange={props.onChange}
                name={option.value}
                checked={Boolean(props.value[option.value])}
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
