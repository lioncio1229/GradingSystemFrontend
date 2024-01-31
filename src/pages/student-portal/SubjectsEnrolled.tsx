import { useState, useEffect } from "react";
import DataTable, { Column } from "components/DataTable";
import { Subject } from "services/types";
import { useGetAllSubjectsTriggerMutation } from "services/subjectServices";
import { useSelector } from "react-redux";
import { studentSelector } from "./slice";

export default function SubjectsEnrolled() {
  const student = useSelector(studentSelector);
  const [getAllSubjects] = useGetAllSubjectsTriggerMutation();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!student) return;

    getAllSubjects({
      semester: student.semester.key,
      strand: student.strand.code,
      yearLevel: student.yearLevel.key,
    })
      .unwrap()
      .then((resp) => {
        const subjects = resp as Subject[];
        subjects.forEach;
        setSubjects(subjects);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  const columns: Column<Subject>[] = [
    {
      label: "No.",
      display: (_, i) => i + 1,
    },
    {
      label: "Code",
      display: (subject) => subject.code,
    },
    {
      label: "Student Subject(s)",
      display: (subject) => subject.name,
    },
  ];

  return <DataTable columns={columns} rows={subjects} />;
}
