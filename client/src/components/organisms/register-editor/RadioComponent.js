import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

function RadioComponent(props) {
  return (
    <FormControl>
      <FormLabel {...props}>{props.label}</FormLabel>
      <RadioGroup {...props} name={props.id}>
        {Object.entries(props.options).map(([id, option], index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio disabled={props.disabled} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioComponent;
