import { useGetGradesByStudentQuery } from "services/gradeServices";
import { Grade } from "services/types";
import useUserInfo from "hooks/useUserInfo";
import DataTable, { Column } from "components/DataTable";

export default function ReportCard() {
  const { id } = useUserInfo();
  const { data: GradesData = [] } = useGetGradesByStudentQuery({
    studentId: id,
  });

  const columns: Column<Grade>[] = [
    {
      label: "No.",
      display: (_, i) => i + 1,
    },
    {
      label: "Code",
      display: (grade) => grade.subjectCode,
    },
    {
      label: "Description",
      display: (grade) => grade.subjectDescription,
    },
    {
      label: "Faculty",
      display: (grade) => grade.facultyName,
    },
    {
      label: "Prelim",
      display: (grade) => grade.q1.toString(),
    },
    {
      label: "Midterm",
      display: (grade) => grade.q2.toString(),
    },
    {
      label: "Semi Final",
      display: (grade) => grade.q3.toString(),
    },
    {
      label: "Final",
      display: (grade) => grade.q4.toString(),
    },
    {
      label: "Grade",
      display: (grade) => grade.average.toString(),
    },
    {
      label: "Remarks",
      display: (grade) => grade.remarks,
    },
  ];

  return <DataTable columns={columns} rows={GradesData} />;
}
