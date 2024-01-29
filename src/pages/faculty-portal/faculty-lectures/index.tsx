import { useState, useEffect } from "react";
import DataTable, { Column } from "components/DataTable";
import { useGetAllLecturesQuery } from "services/lectureServices";
import { Lecture } from "services/types";
import useUserInfo from "hooks/useUserInfo";

export default function FacultyLectures() {
  const { id } = useUserInfo();
  const { data } = useGetAllLecturesQuery(null);
  const [filteredLectures, setFilteredLectures] = useState<Lecture[]>();

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
  ];

  useEffect(() => {
    if (data && id !== "") {
      const lectures = data.filter((o: Lecture) => o.subject.faculty.id === id);
      setFilteredLectures(lectures);
    }
  }, [data, id]);

  return (
    <>
      <DataTable columns={columns} rows={filteredLectures} />
    </>
  );
}
