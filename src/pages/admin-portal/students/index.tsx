import { useState } from "react";
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
} from "@mui/material";
import { Student, StudentUpsertSchema } from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Add, Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import SelectWrapper from "components/SelectWrapper";
import useAcademic from "../hooks/useAcademic";
import DeleteModal from "components/DeleteModal";
import { useSnackbar } from "notistack";

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
    useState<StudentUpsertSchema | null>(null);

  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [upsertType, setUpsertType] = useState<Upsert | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { strands, semesters, yearLevels } = useAcademic();
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
      label: "Student type",
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
    const studentToAdd: StudentUpsertSchema = {
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
      semesterKey: "",
      strandCode: "",
      yearLevelKey: "",
    };

    setUpsertType(Upsert.Add);
    setTargetStudent(studentToAdd);
    setOpenUpsertModal(true);
  };

  const mapStudentToScheme = (student: Student): StudentUpsertSchema => {
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
      semesterKey: student.semester.key,
      strandCode: student.strand.code,
      yearLevelKey: student.yearLevel.key,
    } as StudentUpsertSchema;
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
    setFilter(updatedFilter);
    refetch();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetStudent({
      ...targetStudent,
      [event.target.name]: event.target.value,
    } as StudentUpsertSchema);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTargetStudent({
      ...targetStudent,
      [event.target.name]: event.target.value,
    } as StudentUpsertSchema);
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

  return (
    <>
      <CustomModal
        open={openUpsertModal}
        onConfirm={handleConfirm}
        onClose={() => setOpenUpsertModal(false)}
        title={(upsertType === Upsert.Add ? "Add" : "Update") + " Student"}
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
            <TextField
              name="birthdate"
              variant="outlined"
              label="Birthdate"
              fullWidth
              value={targetStudent.birthdate}
              onChange={handleTextChange}
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
            />
            <TextField
              name="gender"
              variant="outlined"
              label="Gender"
              fullWidth
              value={targetStudent.gender}
              onChange={handleTextChange}
            />
            <TextField
              name="status"
              variant="outlined"
              label="Status"
              fullWidth
              value={targetStudent.status}
              onChange={handleTextChange}
            />
            <TextField
              name="studentType"
              variant="outlined"
              label="Student Type"
              fullWidth
              value={targetStudent.studentType}
              onChange={handleTextChange}
            />
            <SelectWrapper
              name="strandCode"
              items={strands}
              label="Strand"
              onChange={handleSelectChange}
              value={targetStudent.strandCode}
            />
            <SelectWrapper
              name="semesterKey"
              items={semesters}
              label="Semester"
              onChange={handleSelectChange}
              value={targetStudent.semesterKey}
            />
            <SelectWrapper
              name="yearLevelKey"
              items={yearLevels}
              label="Year Level"
              onChange={handleSelectChange}
              value={targetStudent.yearLevelKey}
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
