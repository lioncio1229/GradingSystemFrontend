import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface DatePickerWrapperProps {
  label: string;
  value: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
}

export default function DatePickerWrapper({
  label,
  value,
  onChange,
}: DatePickerWrapperProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={value}
          label={label}
          onChange={onChange}
          sx={{width: "100%"}}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
