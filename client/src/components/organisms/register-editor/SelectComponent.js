import { Select, MenuItem } from "@mui/material";

function SelectComponent({ data }) {
  const { InputProps, ...rest } = data;
  return (
    <Select {...rest} name={data.id}>
      {Object.entries(data.options).map(([id, option], index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectComponent;
