import { useState, useMemo } from "react";
import DataTable, { Column } from "components/DataTable";
import { useGetAllSubjectsQuery } from "services/subjectServices";
import { Stack, IconButton, TextField, SelectChangeEvent } from "@mui/material";
import { Subject } from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";
import { Edit, Delete } from "@mui/icons-material";
import CustomModal from "components/CustomModal";
import SelectWrapper from "components/SelectWrapper";
import useAcademic from "../hooks/useAcademic";
import { SubjectAddUpdateSchema } from "services/types";
import { useGetFacultiesQuery } from "services/facultyServices";
import { Item } from "components/SelectWrapper";
import { FacultyType } from "services/types";

export default function Subjects() {
  const [filter, setFilter] = useState<Filter>({
    semester: "sem1",
    strand: "ICT",
    yearLevel: "g11",
  });

  const [selectedSubject, setSelectedSubject] = useState<SubjectAddUpdateSchema | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  
  const { strands, semesters, yearLevels } = useAcademic();
  const { data } = useGetAllSubjectsQuery(filter);
  const { data: faculties = [] } = useGetFacultiesQuery(null);

  const facultyList : Item[] = useMemo(() => 
    faculties.map((o : FacultyType) => ({
      key: o.id,
      value: o.id,
      label: o.firstName + " " + o.lastName
    } as Item))
  , [faculties])

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
    
    const subjectToUpdate : SubjectAddUpdateSchema = {
      userId: subject.faculty.id,
      name: subject.name,
      room: subject.room,
      code: subject.code,
      type: subject.type,
      strandCode: subject.strand.code,
      yearLevelKey: subject.yearLevel.key,
      semesterKey: subject.semester.key
    };

    setSelectedSubject(subjectToUpdate);
    setOpenUpdateModal(true);
  };

  const handleFilterChange = (updatedFilter: Filter) => {
    setFilter(updatedFilter);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubject({
      ...selectedSubject,
      [event.target.name]: event.target.value,
    } as SubjectAddUpdateSchema);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedSubject({
      ...selectedSubject,
      [event.target.name]: event.target.value,
    } as SubjectAddUpdateSchema);
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
            <SelectWrapper 
              name="strandCode"
              items={strands}
              label="Strand"
              onChange={handleSelectChange}
              value={selectedSubject.strandCode}
            />
            <SelectWrapper 
              name="userId"
              items={facultyList}
              label="Faculty"
              onChange={handleSelectChange}
              value={selectedSubject.userId}
            />
            <SelectWrapper 
              name="semesterKey"
              items={semesters}
              label="Semester"
              onChange={handleSelectChange}
              value={selectedSubject.semesterKey}
            />
            <SelectWrapper 
              name="yearLevelKey"
              items={yearLevels}
              label="Year Level"
              onChange={handleSelectChange}
              value={selectedSubject.yearLevelKey}
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
