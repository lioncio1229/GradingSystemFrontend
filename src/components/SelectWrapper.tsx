import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export type Item = {
  key: string;
  value: string;
  label: string;
};

export type SelectWrapperProps = {
  items: Item[];
  value: string;
  label: string;
  name: string;
  onChange: (event: SelectChangeEvent) => void;
};

export default function SelectWrapper({
  items = [],
  value,
  label,
  name,
  onChange,
}: SelectWrapperProps): JSX.Element {
  return (
    <FormControl fullWidth>
      <InputLabel id="select">{label}</InputLabel>
      <Select
        labelId="select"
        id="select"
        value={value}
        label={label}
        onChange={onChange}
        name={name}
      >
        {items.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
