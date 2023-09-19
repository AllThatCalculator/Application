import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

function SelectComponent(props) {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props} name={props.id}>
        {Object.entries(props.options).map(([id, option], index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
