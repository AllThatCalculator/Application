import { Select, MenuItem } from "@mui/material";

function SelectComponent(props) {
  return (
    <Select {...props} name={props.id}>
      {Object.entries(props.options).map(([id, option], index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectComponent;
