import { useState, useEffect } from "react";
import DataTable, { Column } from "components/DataTable";
import { Lecture } from "services/types";
import { useGetLecturesTriggerMutation } from "services/lectureServices";
import { useSelector } from "react-redux";
import { studentSelector } from "./slice";

export default function StudentLectures() {
  const student = useSelector(studentSelector);
  const [getAllLectures] = useGetLecturesTriggerMutation();
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    if (!student) return;

    getAllLectures({
      semester: student.semester.key,
      strand: student.strand.code,
      yearLevel: student.yearLevel.key,
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
