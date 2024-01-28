import { useState, useMemo } from "react";
import DataTable, { Column } from "components/DataTable";
import {
  useGetAllSubjectsQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "services/subjectServices";
import {
  Stack,
  IconButton,
  TextField,
  SelectChangeEvent,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import {
  Subject,
  User,
  SubjectUpsertRequest as SubjectUpsertRequest,
} from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Add, Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import SelectWrapper from "components/SelectWrapper";
import { useGetAllUsersQuery } from "services/userServices";
import { Item } from "components/SelectWrapper";
import DeleteModal from "components/DeleteModal";
import { useSnackbar } from "notistack";

enum Upsert {
  Add,
  Update,
}

export default function Subjects() {
  const [filter, setFilter] = useState<Filter>({
    semester: "sem1",
    strand: "ICT",
    yearLevel: "g11",
  });

  const [targetSubject, setTargetSubject] =
    useState<SubjectUpsertRequest | null>(null);

  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [upsertType, setUpsertType] = useState<Upsert | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { data, refetch } = useGetAllSubjectsQuery(filter);
  const { data: faculties = [] } = useGetAllUsersQuery(null);

  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const { enqueueSnackbar } = useSnackbar();

  const facultyList: Item[] = useMemo(
    () =>
      faculties.map(
        (o: User) =>
          ({
            key: o.id,
            value: o.id,
            label: o.firstName + " " + o.lastName,
          } as Item)
      ),
    [faculties]
  );

  const columns: Column<Subject>[] = [
    {
      label: "Name",
      display: (subject) => subject.name,
    },
    {
      label: "Code",
      display: (subject) => subject.code,
    },
    {
      label: "Type",
      display: (subject) => subject.type,
    },
    {
      label: "Structor",
      display: (subject) =>
        subject.faculty.firstName + " " + subject.faculty.lastName,
    },
    {
      label: "Actions",
      display: (subject) => (
        <>
          <IconButton
            sx={{ color: "secondary.dark" }}
            onClick={() => handleUpdateButtonClick(subject)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteButtonClick(subject)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleAddButtonClick = () => {
    const subjectToAdd: SubjectUpsertRequest = {
      id: "",
      userId: "",
      name: "",
      room: "",
      code: "",
      type: "",
      strandCode: filter.strand,
      yearLevelKey: filter.yearLevel,
      semesterKey: filter.semester,
    };

    setUpsertType(Upsert.Add);
    setTargetSubject(subjectToAdd);
    setOpenUpsertModal(true);
  };

  const mapSubjectToScheme = (subject: Subject): SubjectUpsertRequest => {
    return {
      id: subject.id,
      userId: subject.faculty.id,
      name: subject.name,
      room: subject.room,
      code: subject.code,
      type: subject.type,
      strandCode: filter.strand,
      yearLevelKey: filter.yearLevel,
      semesterKey: filter.semester,
    } as SubjectUpsertRequest;
  };

  const handleUpdateButtonClick = (subject: Subject) => {
    const subjectToUpdate = mapSubjectToScheme(subject);
    setTargetSubject(subjectToUpdate);
    setUpsertType(Upsert.Update);
    setOpenUpsertModal(true);
  };

  const handleDeleteButtonClick = (subject: Subject) => {
    const subjectToDelete = mapSubjectToScheme(subject);
    setTargetSubject(subjectToDelete);
    setOpenDeleteModal(true);
  };

  const handleFilterChange = (updatedFilter: Filter) => {
    setFilter(updatedFilter);
    refetch();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetSubject({
      ...targetSubject,
      [event.target.name]: event.target.value,
    } as SubjectUpsertRequest);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTargetSubject({
      ...targetSubject,
      [event.target.name]: event.target.value,
    } as SubjectUpsertRequest);
  };

  const handleConfirm = () => {
    if (targetSubject == null || upsertType == null) return;

    let action = null;

    if (upsertType === Upsert.Add) action = addSubject(targetSubject);
    else action = updateSubject(targetSubject);

    action.unwrap().then((resp) => {
      refetch();
      setOpenUpsertModal(false);
      enqueueSnackbar(resp.message);
    });
  };

  const handleSubjectDelete = () => {
    if (targetSubject == null) return;

    deleteSubject({ id: targetSubject.id })
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
        title={<Typography color="primary" variant="h6">
        {(upsertType === Upsert.Add ? "Add" : "Update") + " New Subject"}
      </Typography>}
      >
        {targetSubject && (
          <Stack rowGap={2}>
            <TextField
              name="name"
              variant="outlined"
              label="Name"
              fullWidth
              value={targetSubject.name}
              onChange={handleTextChange}
            />
            <TextField
              name="code"
              variant="outlined"
              label="Code"
              fullWidth
              value={targetSubject.code}
              onChange={handleTextChange}
            />
            <TextField
              name="type"
              variant="outlined"
              label="Type"
              fullWidth
              value={targetSubject.type}
              onChange={handleTextChange}
            />
            <SelectWrapper
              name="userId"
              items={facultyList}
              label="Faculty"
              onChange={handleSelectChange}
              value={targetSubject.userId}
            />
          </Stack>
        )}
      </CustomModal>

      <DeleteModal
        open={openDeleteModal}
        onConfirm={handleSubjectDelete}
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
            Add Subject
          </Button>
        </Toolbar>
        <DataTable columns={columns} rows={data} />
      </Stack>
    </>
  );
}
