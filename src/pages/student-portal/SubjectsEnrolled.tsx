import { useState, useEffect } from "react";
import DataTable, {Column} from "components/DataTable"
import { Box } from "@mui/material"
import { Student, Subject } from "services/types";
import useUserInfo from "hooks/useUserInfo";
import { useGetAllSubjectsTriggerMutation } from "services/subjectServices";
import { useGetStudentQuery } from "services/studentServices";

export default function SubjectsEnrolled(){
    const { id } = useUserInfo();
    const { data: student } = useGetStudentQuery({studentId: id === "" ? "0" : id});
    const [ getAllSubjects ] = useGetAllSubjectsTriggerMutation();
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        if(!student) return;

        const _student = student as Student;
        getAllSubjects({semester: _student.semester.key, strand: _student.strand.code, yearLevel: _student.yearLevel.key}).unwrap().then(resp => {
            const subjects = resp as Subject[];
            subjects.forEach
            setSubjects(subjects);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [student]);

    const columns: Column<Subject>[] = [
        {
            label: "No.",
            display: (_, i) => i + 1
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

    return (
        <Box mt={2}>
            <DataTable columns={columns} rows={subjects}/>
        </Box>
    )
}