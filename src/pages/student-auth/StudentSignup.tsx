import { useState, useMemo } from "react";
import {
  Container,
  Box,
  TextField,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import SelectWrapper from "components/SelectWrapper";
import { useGetStrandsQuery } from "services/academicLevelServices";
import { Item } from "components/SelectWrapper";
import { StudentUpsertRequest, Strand } from "services/types";

const StudentTypes : Item [] = [
  {
    key: "newStudent",
    value: "newStudent",
    label: "New Student",
  },
  {
    key: "oldStudent",
    value: "oldStudent",
    label: "Old Student",
  },
  {
    key: "transferee",
    value: "transferee",
    label: "Transferee",
    displayData: () => "(Any year level)"
  },
]

export default function StudentSignup() {
  const { data: strandsData = [] } = useGetStrandsQuery(null);
  const [inputs, setInputs] = useState<StudentUpsertRequest>();

  const strands: Item[] = useMemo(() => {
    const data = strandsData as Strand[];
    return data.map(
      (o) =>
        ({
          key: o.code,
          value: o.code,
          label: o.description,
        } as Item)
    );
  }, [strandsData]);

  const handleInputChange = (event: SelectChangeEvent) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    } as StudentUpsertRequest);
  };

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <Stack gap={2}>
          <TextField label="First Name" fullWidth />
          <TextField label="Middle Name" fullWidth />
          <TextField label="Last Name" fullWidth />
          <TextField label="Suffix Name" fullWidth />
          <SelectWrapper
            name="strandCode"
            label="Strand"
            items={strands}
            value={inputs?.strandCode}
            onChange={handleInputChange}
          />
          <SelectWrapper
            name="yearLevelKey"
            label="Year Level"
            items={strands}
            value={inputs?.yearLevelKey}
            onChange={handleInputChange}
          />
          <SelectWrapper
            name="semesterKey"
            label="Semester"
            items={strands}
            value={inputs?.semesterKey}
            onChange={handleInputChange}
          />
          <SelectWrapper
            name="semesterKey"
            label="Semester"
            items={StudentTypes}
            value={inputs?.semesterKey}
            onChange={handleInputChange}
          />
        </Stack>
      </Container>
    </Box>
  );
}
