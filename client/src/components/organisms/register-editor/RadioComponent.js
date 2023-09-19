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
            {...option}
            key={index}
            disabled={Boolean(props.disabled)}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioComponent;
