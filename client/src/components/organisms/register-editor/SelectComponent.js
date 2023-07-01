import { Select, MenuItem } from "@mui/material";

function SelectComponent({ data }) {
  return (
    <Select
      name={data.id}
      label={data.label}
      value={data.value}
      onChange={data.onChange}
      required={data.required}
    >
      {Object.entries(data.options).map(([id, option], index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectComponent;
