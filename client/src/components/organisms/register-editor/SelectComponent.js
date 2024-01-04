import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

function SelectComponent(props) {
  const { isProp, ...prop } = props;

  // issue) multi select value : ""
  return (
    <FormControl fullWidth>
      <InputLabel>{prop.label}</InputLabel>
      <Select {...prop} name={prop.id} size={isProp ? "small" : "medium"}>
        {Object.entries(prop.options).map(([id, option], index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectComponent;
