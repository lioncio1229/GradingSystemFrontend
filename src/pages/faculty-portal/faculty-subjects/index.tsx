import DataTable, { Column } from "components/DataTable";
import { Subject } from "services/types";
import { useSelector } from "react-redux";
import { rawSubjectSelector } from "../slice";

export default function FacultySubjects() {
  const subjects = useSelector(rawSubjectSelector);

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
      label: "Strand",
      display: (subject) => subject.strand.description,
    },
    {
      label: "Year Level",
      display: (subject) => subject.yearLevel.name,
    },
    {
      label: "Semester",
      display: (subject) => subject.semester.name,
    },
  ];

  return <DataTable columns={columns} rows={subjects}/>;
}
