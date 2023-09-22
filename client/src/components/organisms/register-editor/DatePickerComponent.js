import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DatePickerComponent(props) {
  const { isProp, ...prop } = props;
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
