import { Select, MenuItem } from "@mui/material";

function SelectComponent({ data }) {
  return (
    <Select {...data} name={data.id}>
      {Object.entries(data.options).map(([id, option], index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectComponent;
