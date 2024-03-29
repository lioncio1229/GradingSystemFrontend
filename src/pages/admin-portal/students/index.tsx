import { useState, useEffect } from "react";
import DataTable, { Column } from "components/DataTable";
import {
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "services/studentServices";
import {
  Stack,
  IconButton,
  TextField,
  SelectChangeEvent,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import { Student, StudentUpsertRequest } from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Add, Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import DeleteModal from "components/DeleteModal";
import { useSnackbar } from "notistack";
import DatePickerWrapper from "layout/DatePickerWrapper";
import dayjs, { Dayjs } from "dayjs";
import SelectWrapper from "components/SelectWrapper";

import {
  Gender,
  StudentStatus,
  StudentTypes,
} from "pages/student-auth/StudentSignup";

enum Upsert {
  Add,
  Update,
}

export default function Students() {
  const [filter, setFilter] = useState<Filter>({
    semester: "sem1",
    strand: "ICT",
    yearLevel: "g11",
  });

  const [targetStudent, setTargetStudent] =
    useState<StudentUpsertRequest | null>(null);

  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [upsertType, setUpsertType] = useState<Upsert | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { data, refetch } = useGetAllStudentsQuery(filter);

  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const { enqueueSnackbar } = useSnackbar();

  const columns: Column<Student>[] = [
    {
      label: "First Name",
      display: (student) => student.firstName,
    },
    {
      label: "Last Name",
      display: (student) => student.lastName,
    },
    {
      label: "Middle Name",
      display: (student) => student.middleName,
    },
    {
      label: "Student Type",
      display: (student) => student.studentType,
    },
    {
      label: "Gender",
      display: (student) => student.gender,
    },
    {
      label: "Mobile Number",
      display: (student) => student.mobileNumber,
    },
    {
      label: "Actions",
      display: (student) => (
        <>
          <IconButton
            sx={{ color: "secondary.dark" }}
            onClick={() => handleUpdateButtonClick(student)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteButtonClick(student)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleAddButtonClick = () => {
    const studentToAdd: StudentUpsertRequest = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      sufix: "",
      birthdate: "",
      nationality: "",
      mobileNumber: "",
      facebookUrl: "",
      lrn: "",
      gender: "",
      status: "",
      studentType: "",
      strandCode: filter.strand,
      yearLevelKey: filter.yearLevel,
      semesterKey: filter.semester,
    };

    setUpsertType(Upsert.Add);
    setTargetStudent(studentToAdd);
    setOpenUpsertModal(true);
  };

  const mapStudentToScheme = (student: Student): StudentUpsertRequest => {
    return {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleName: student.middleName,
      sufix: student.sufix,
      birthdate: student.birthdate,
      nationality: student.nationality,
      mobileNumber: student.mobileNumber,
      facebookUrl: student.facebookUrl,
      lrn: student.lrn,
      gender: student.gender,
      status: student.status,
      studentType: student.studentType,
      strandCode: filter.strand,
      yearLevelKey: filter.yearLevel,
      semesterKey: filter.semester,
    } as StudentUpsertRequest;
  };

  const handleUpdateButtonClick = (student: Student) => {
    const studentToUpdate = mapStudentToScheme(student);
    setTargetStudent(studentToUpdate);
    setUpsertType(Upsert.Update);
    setOpenUpsertModal(true);
  };

  const handleDeleteButtonClick = (student: Student) => {
    const studentToDelete = mapStudentToScheme(student);
    setTargetStudent(studentToDelete);
    setOpenDeleteModal(true);
  };

  const handleFilterChange = (updatedFilter: Filter) => {
    localStorage.setItem("filter", JSON.stringify(updatedFilter));

    setFilter(updatedFilter);
    refetch();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetStudent({
      ...targetStudent,
      [event.target.name]: event.target.value,
    } as StudentUpsertRequest);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTargetStudent({
      ...targetStudent,
      [event.target.name]: event.target.value,
    } as StudentUpsertRequest);
  };

  const handleBirthdateChange = (date: Dayjs) => {
    setTargetStudent({
      ...targetStudent,
      birthdate: date.format("MM/DD/YYYY"),
    } as StudentUpsertRequest);
  };

  const handleConfirm = () => {
    if (targetStudent == null || upsertType == null) return;

    let action = null;

    if (upsertType === Upsert.Add) action = addStudent(targetStudent);
    else action = updateStudent(targetStudent);

    action.unwrap().then((resp) => {
      refetch();
      setOpenUpsertModal(false);
      enqueueSnackbar(resp.message);
    });
  };

  const handleStudentDelete = () => {
    if (targetStudent == null) return;

    deleteStudent({ id: targetStudent.id })
      .unwrap()
      .then((resp) => {
        refetch();
        setOpenDeleteModal(false);
        enqueueSnackbar(resp.message);
      });
  };

  useEffect(() => {
    const filter = localStorage.getItem("filter");
    if(filter === null) return;

    setFilter(JSON.parse(filter) as Filter);
  }, []);

  return (
    <>
      <CustomModal
        open={openUpsertModal}
        onConfirm={handleConfirm}
        onClose={() => setOpenUpsertModal(false)}
        title={
          <Typography color="primary" variant="h6">
            {(upsertType === Upsert.Add ? "Add" : "Update") + " New Student"}
          </Typography>
        }
      >
        {targetStudent && (
          <Stack rowGap={2}>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              fullWidth
              value={targetStudent.email}
              onChange={handleTextChange}
            />
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name"
              fullWidth
              value={targetStudent.firstName}
              onChange={handleTextChange}
            />
            <TextField
              name="lastName"
              variant="outlined"
              label="Last Name"
              fullWidth
              value={targetStudent.lastName}
              onChange={handleTextChange}
            />
            <TextField
              name="middleName"
              variant="outlined"
              label="Middle Name"
              fullWidth
              value={targetStudent.middleName}
              onChange={handleTextChange}
            />
            <TextField
              name="sufix"
              variant="outlined"
              label="Suffix"
              fullWidth
              value={targetStudent.sufix}
              onChange={handleTextChange}
            />
            <DatePickerWrapper
              label="Birthdate"
              value={
                targetStudent.birthdate !== ""
                  ? dayjs(targetStudent.birthdate)
                  : dayjs("1/1/1999")
              }
              onChange={handleBirthdateChange}
            />
            <TextField
              name="nationality"
              variant="outlined"
              label="Nationality"
              fullWidth
              value={targetStudent.nationality}
              onChange={handleTextChange}
            />
            <TextField
              name="mobileNumber"
              variant="outlined"
              label="Mobile Number"
              fullWidth
              value={targetStudent.mobileNumber}
              onChange={handleTextChange}
            />
            <TextField
              name="facebookUrl"
              variant="outlined"
              label="Facebook URL"
              fullWidth
              value={targetStudent.facebookUrl}
              onChange={handleTextChange}
            />
            <TextField
              name="lrn"
              variant="outlined"
              label="LRN"
              fullWidth
              value={targetStudent.lrn}
              onChange={handleTextChange}
              required
            />
            <SelectWrapper
              name="studentType"
              label="Student Type"
              items={StudentTypes}
              value={targetStudent.studentType}
              onChange={handleSelectChange}
              required
            />
            <SelectWrapper
              name="gender"
              label="Gender"
              items={Gender}
              value={targetStudent.gender}
              onChange={handleSelectChange}
              required
            />

            <SelectWrapper
              name="status"
              label="Temporary student status"
              items={StudentStatus}
              value={targetStudent.status}
              onChange={handleSelectChange}
              required
            />
          </Stack>
        )}
      </CustomModal>

      <DeleteModal
        open={openDeleteModal}
        onConfirm={handleStudentDelete}
        onClose={() => setOpenDeleteModal(false)}
      />

      <Stack spacing={1}>
        <SearchFilter filter={filter} onChange={handleFilterChange} />
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<Add />}
            onClick={handleAddButtonClick}
            variant="contained"
          >
            Add Student
          </Button>
        </Toolbar>
        <DataTable columns={columns} rows={data} />
      </Stack>
    </>
  );
}
