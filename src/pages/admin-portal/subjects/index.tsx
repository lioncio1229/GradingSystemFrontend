import { useState } from "react";
import DataTable, { Column } from "components/DataTable";
import { useGetAllSubjectsQuery } from "services/subjectServices";
import { Stack, IconButton, TextField } from "@mui/material";
import { Subject } from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import SelectWrapper from "components/SelectWrapper";
import { useGetStrandsQuery, useGetSemestersQuery, useGetYearLevelsQuery } from "services/academicLevelServices";

export default function Subjects() {
  const [filter, setFilter] = useState<Filter>({
    semester: "sem1",
    strand: "ICT",
    yearLevel: "g11",
  });

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const { data } = useGetAllSubjectsQuery(filter);
  const { data: strands = [] } = useGetStrandsQuery(null);
  const { data: semesters = [] } = useGetSemestersQuery(null);
  const { data: yearLevels = [] } = useGetYearLevelsQuery(null);

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
            onClick={() => handleUpdateClick(subject)}
          >
            <Edit />
          </IconButton>
          <IconButton color="error">
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const handleUpdateClick = (subject: Subject) => {
    setSelectedSubject({...subject});
    setOpenUpdateModal(true);
  };

  const handleFilterChange = (updatedFilter: Filter) => {
    setFilter(updatedFilter);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject({
      ...selectedSubject,
      [event.target.name]: event.target.value,
    } as Subject);
  };

  return (
    <>
      <CustomModal
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        title="Update Subject"
      >
        {selectedSubject && (
          <Stack rowGap={2}>
            <TextField
              name="name"
              variant="outlined"
              label="Name"
              fullWidth
              value={selectedSubject.name}
              onChange={handleTextChange}
            />
            <TextField
              name="code"
              variant="outlined"
              label="Code"
              fullWidth
              value={selectedSubject.code}
              onChange={handleTextChange}
            />
            <TextField
              name="type"
              variant="outlined"
              label="Type"
              fullWidth
              value={selectedSubject.type}
              onChange={handleTextChange}
            />
          </Stack>
        )}
      </CustomModal>

      <Stack spacing={2}>
        <SearchFilter filter={filter} onChange={handleFilterChange} />

        <DataTable columns={columns} rows={data} />
      </Stack>
    </>
  );
}
