import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export type Item = {
  key: string;
  value: string;
  label: string;
  displayData?: () => string;
};

export type SelectWrapperProps = {
  items?: Item[];
  value?: string;
  label: string;
  name?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: SelectChangeEvent) => void;
};

export default function SelectWrapper({
  items = [],
  value = "",
  label,
  name,
  onChange,
  fullWidth = true,
  disabled,
  required,
}: SelectWrapperProps): JSX.Element {
  return (
    <FormControl fullWidth={fullWidth} sx={{ minWidth: 300 }}>
      <InputLabel id="select">{label}</InputLabel>
      <Select
        labelId="select"
        id="select"
        value={value}
        label={label}
        onChange={onChange}
        name={name}
        disabled={disabled}
        required={required}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={item.value}>
            <span
              style={{
                paddingRight: item.displayData !== undefined ? "10px" : "0",
              }}
            >
              {item.label}
            </span>
            {item.displayData !== undefined && (
              <Typography fontSize={11} color={grey[700]}>
                {item.displayData()}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
