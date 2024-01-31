import { useState, useMemo } from "react";
import {
  Container,
  Box,
  TextField,
  Stack,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SelectWrapper from "components/SelectWrapper";
import {
  useGetStrandsQuery,
  useGetSemestersQuery,
  useGetYearLevelsQuery,
} from "services/academicLevelServices";
import { Item } from "components/SelectWrapper";
import {
  StudentUpsertRequest,
  Strand,
  Semester,
  YearLevel,
} from "services/types";
import DatePickerWrapper from "layout/DatePickerWrapper";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { useRegisterStudentMutation } from "services/studentAuthServices";

const StudentTypes: Item[] = [
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
    displayData: () => "(Any year level)",
  },
];

const StudentStatus: Item[] = [
  {
    key: "regular",
    value: "regular",
    label: "Regular",
  },
  {
    key: "irregular",
    value: "irregular",
    label: "Irregular",
  },
];

const Gender: Item[] = [
  {
    key: "female",
    value: "female",
    label: "Female",
  },
  {
    key: "male",
    value: "male",
    label: "Male",
  },
];

export default function StudentSignup() {
  const { data: strandsData = [] } = useGetStrandsQuery(null);
  const { data: semesterData = [] } = useGetSemestersQuery(null);
  const { data: yearLevelData = [] } = useGetYearLevelsQuery(null);
  const [registerStudent] = useRegisterStudentMutation();
  const [isButtonLoading, setButtonLoading] = useState(false);

  const [inputs, setInputs] = useState<StudentUpsertRequest>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    sufix: "",
    birthdate: dayjs("1/1/1999").format("MM/DD/YYYY"),
    nationality: "",
    mobileNumber: "",
    facebookUrl: "",
    lrn: "",
    gender: "",
    status: "",
    studentType: "",
    strandCode: "",
    yearLevelKey: "",
    semesterKey: "",
  });

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

  const semesters: Item[] = useMemo(() => {
    const data = semesterData as Semester[];
    return data.map(
      (o) =>
        ({
          key: o.key,
          value: o.key,
          label: o.name,
        } as Item)
    );
  }, [semesterData]);

  const yearLevels: Item[] = useMemo(() => {
    const data = yearLevelData as YearLevel[];
    return data.map(
      (o) =>
        ({
          key: o.key,
          value: o.key,
          label: o.name,
        } as Item)
    );
  }, [yearLevelData]);

  const handleInputChange = (event: SelectChangeEvent) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    } as StudentUpsertRequest);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    } as StudentUpsertRequest);
  };

  const handleBirthdateChange = (date: Dayjs) => {
    setInputs({
      ...inputs,
      birthdate: date.format("MM/DD/YYYY"),
    } as StudentUpsertRequest);
  };

  const canSubmit = (): boolean => {
    const notRequired = ["id", "sufix", "facebookUrl", "mobileNumber"];

    return !Object.entries(inputs).some(
      ([key, value]) => !notRequired.includes(key) && value === ""
    );
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      setButtonLoading(true);
      registerStudent(inputs)
        .unwrap()
        .then((resp) => {
          localStorage.setItem("token", resp.token);
          setButtonLoading(false);
        })
        .catch((e) => {
          setButtonLoading(false);
        });
    }
  };

  return (
    <Box mt={4} mb={4}>
      <Container maxWidth="sm">
        <Stack gap={2}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            value={inputs.firstName}
            onChange={handleTextChange}
            required
          />
          <TextField
            name="middleName"
            label="Middle Name"
            fullWidth
            value={inputs.middleName}
            onChange={handleTextChange}
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={inputs.lastName}
            onChange={handleTextChange}
            required
          />
          <TextField
            name="sufix"
            label="Suffix Name"
            fullWidth
            value={inputs.sufix}
            onChange={handleTextChange}
          />
          <TextField
            name="lrn"
            label="LRN"
            fullWidth
            value={inputs.lrn}
            onChange={handleTextChange}
            required
          />
          <SelectWrapper
            name="strandCode"
            label="Strand"
            items={strands}
            value={inputs.strandCode}
            onChange={handleInputChange}
            required
          />
          <SelectWrapper
            name="yearLevelKey"
            label="Year Level"
            items={yearLevels}
            value={inputs.yearLevelKey}
            onChange={handleInputChange}
            required
          />
          <SelectWrapper
            name="semesterKey"
            label="Semester"
            items={semesters}
            value={inputs.semesterKey}
            onChange={handleInputChange}
            required
          />
          <SelectWrapper
            name="studentType"
            label="Student Type"
            items={StudentTypes}
            value={inputs.studentType}
            onChange={handleInputChange}
            required
          />
          <SelectWrapper
            name="status"
            label="Temporary student status"
            items={StudentStatus}
            value={inputs.status}
            onChange={handleInputChange}
            required
          />
          <SelectWrapper
            name="gender"
            label="Gender"
            items={Gender}
            value={inputs.gender}
            onChange={handleInputChange}
            required
          />
          <DatePickerWrapper
            label="Birthdate"
            value={
              inputs.birthdate !== ""
                ? dayjs(inputs.birthdate)
                : dayjs("1/1/1999")
            }
            onChange={handleBirthdateChange}
          />
          <TextField
            name="nationality"
            label="Nationality"
            fullWidth
            value={inputs.nationality}
            onChange={handleTextChange}
            required
          />
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            value={inputs.mobileNumber}
            onChange={handleTextChange}
          />
          <TextField
            name="facebookUrl"
            label="Facebook URL"
            fullWidth
            value={inputs.facebookUrl}
            onChange={handleTextChange}
          />
          <TextField
            type="email"
            name="email"
            label="Email Address"
            fullWidth
            value={inputs.email}
            onChange={handleTextChange}
            required
          />
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!canSubmit()}
            loading={isButtonLoading}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
}