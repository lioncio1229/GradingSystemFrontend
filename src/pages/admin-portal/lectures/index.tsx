import { useState, useMemo } from "react";
import DataTable, { Column } from "components/DataTable";
import {
  useGetLecturesQuery,
  useAddLectureMutation,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
} from "services/lectureServices";
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
  Lecture,
  LectureUpsertRequest as LectureUpsertRequest,
  Subject,
} from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Add, Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import SelectWrapper from "components/SelectWrapper";
import DeleteModal from "components/DeleteModal";
import { useSnackbar } from "notistack";
import { useGetAllSubjectsQuery } from "services/subjectServices";
import { Item } from "components/SelectWrapper";

enum Upsert {
  Add,
  Update,
}

export default function Lectures() {
  const [filter, setFilter] = useState<Filter>({
    semester: "sem1",
    strand: "ICT",
    yearLevel: "g11",
  });

  const [targetLecture, setTargetLecture] =
    useState<LectureUpsertRequest | null>(null);

  const [openUpsertModal, setOpenUpsertModal] = useState<boolean>(false);
  const [upsertType, setUpsertType] = useState<Upsert | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { data, refetch } = useGetLecturesQuery(filter);

  const [addLecture] = useAddLectureMutation();
  const [updateLecture] = useUpdateLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();

  const { data: subjects = [] } = useGetAllSubjectsQuery(filter);

  const { enqueueSnackbar } = useSnackbar();

  const subjectList: Item[] = useMemo(
    () =>
      subjects.map(
        (o: Subject) =>
          ({
            key: o.id,
            value: o.id,
            label: o.name,
          } as Item)
      ),
    [subjects]
  );

  const columns: Column<Lecture>[] = [
    {
      label: "Code",
      display: (lecture) => lecture.subject.code,
    },
    {
      label: "Subject",
      display: (lecture) => lecture.subject.name,
    },
    {
      label: "Lecture Day",
      display: (lecture) => lecture.lectureDate,
    },
    {
      label: "From",
      display: (lecture) => lecture.from,
    },
    {
      label: "To",
      display: (lecture) => lecture.to,
    },
    {
      label: "Instructor",
      display: (lecture) => lecture.subject.faculty.firstName + " " + lecture.subject.faculty.lastName,
    },
    {
      label: "Actions",
      display: (lecture) => (
        <>
          <IconButton
            sx={{ color: "secondary.dark" }}
            onClick={() => handleUpdateButtonClick(lecture)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteButtonClick(lecture)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleAddButtonClick = () => {
    const lectureToAdd: LectureUpsertRequest = {
      id: "",
      from: "",
      to: "",
      lectureDate: "",
      subjectId1: "",
    };

    setUpsertType(Upsert.Add);
    setTargetLecture(lectureToAdd);
    setOpenUpsertModal(true);
  };

  const mapLectureToScheme = (lecture: Lecture): LectureUpsertRequest => {
    return {
      id: lecture.id,
      lectureDate: lecture.lectureDate,
      from: lecture.from,
      to: lecture.to,
      subjectId1: lecture.subject.id,
    } as LectureUpsertRequest;
  };

  const handleUpdateButtonClick = (lecture: Lecture) => {
    const lectureToUpdate = mapLectureToScheme(lecture);
    setTargetLecture(lectureToUpdate);
    setUpsertType(Upsert.Update);
    setOpenUpsertModal(true);
  };

  const handleDeleteButtonClick = (lecture: Lecture) => {
    const lectureToDelete = mapLectureToScheme(lecture);
    setTargetLecture(lectureToDelete);
    setOpenDeleteModal(true);
  };

  const handleFilterChange = (updatedFilter: Filter) => {
    setFilter(updatedFilter);
    refetch();
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetLecture({
      ...targetLecture,
      [event.target.name]: event.target.value,
    } as LectureUpsertRequest);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setTargetLecture({
      ...targetLecture,
      [event.target.name]: event.target.value,
    } as LectureUpsertRequest);
  };

  const handleConfirm = () => {
    if (targetLecture == null || upsertType == null) return;

    let action = null;

    if (upsertType === Upsert.Add) action = addLecture(targetLecture);
    else action = updateLecture(targetLecture);

    action.unwrap().then((resp) => {
      refetch();
      setOpenUpsertModal(false);
      enqueueSnackbar(resp.message);
    });
  };

  const handleLectureDelete = () => {
    if (targetLecture == null) return;

    deleteLecture({ id: targetLecture.id })
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
        {(upsertType === Upsert.Add ? "Add" : "Update") + " New Lecture"}
      </Typography>}
      >
        {targetLecture && (
          <Stack rowGap={2}>
            <TextField
              name="lectureDate"
              variant="outlined"
              label="Lecture Day"
              fullWidth
              value={targetLecture.lectureDate}
              onChange={handleTextChange}
            />
            <TextField
              name="from"
              variant="outlined"
              label="From"
              fullWidth
              value={targetLecture.from}
              onChange={handleTextChange}
            />
            <TextField
              name="to"
              variant="outlined"
              label="To"
              fullWidth
              value={targetLecture.to}
              onChange={handleTextChange}
            />
            <SelectWrapper
              name="subjectId1"
              items={subjectList}
              label="Subject"
              onChange={handleSelectChange}
              value={targetLecture.subjectId1}
            />
          </Stack>
        )}
      </CustomModal>

      <DeleteModal
        open={openDeleteModal}
        onConfirm={handleLectureDelete}
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
            Add Lecture
          </Button>
        </Toolbar>
        <DataTable columns={columns} rows={data} />
      </Stack>
    </>
  );
}
