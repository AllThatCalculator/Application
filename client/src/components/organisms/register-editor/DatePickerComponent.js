import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function DatePickerComponent(props) {
  const { isProp, ...prop } = props;
  prop.value = prop.value === null ? null : dayjs(prop.value);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...prop}
        slotProps={{
          textField: { size: isProp ? "small" : "medium", fullWidth: true },
        }}
      />
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
