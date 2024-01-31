import { useState, useEffect } from "react";
import DataTable, { Column } from "components/DataTable";
import { Student, Lecture } from "services/types";
import useUserInfo from "hooks/useUserInfo";
import { useGetLecturesTriggerMutation } from "services/lectureServices";
import { useGetStudentQuery } from "services/studentServices";

export default function StudentLectures() {
  const { id } = useUserInfo();
  const { data: student } = useGetStudentQuery({
    studentId: id === "" ? "0" : id,
  });
  const [getAllLectures] = useGetLecturesTriggerMutation();
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    if (!student) return;

    const _student = student as Student;
    getAllLectures({
      semester: _student.semester.key,
      strand: _student.strand.code,
      yearLevel: _student.yearLevel.key,
    })
      .unwrap()
      .then((resp) => {
        const lectures = resp as Lecture[];
        lectures.forEach;
        setLectures(lectures);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  const columns: Column<Lecture>[] = [
    {
      label: "Code",
      display: (lecture) => lecture.subject.code,
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
      label: "Room",
      display: (lecture) => lecture.subject.room,
    },
    {
      label: "Faculty",
      display: (lecture) => lecture.subject.faculty.firstName + " " + lecture.subject.faculty.firstName,
    },
  ];

  return <DataTable columns={columns} rows={lectures} />;
}
