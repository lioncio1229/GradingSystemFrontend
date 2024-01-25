import DataTable, { Column } from "components/DataTable"
import { useGetAllSubjectsQuery } from "services/subjectServices"
import { Box } from "@mui/material"
import { Subject } from "services/types";
import SearchFilter from "../common/SearchFilter";


export default function Subjects()
{
    const { data } = useGetAllSubjectsQuery({
        semester: "sem1",
        strand: "ICT",
        yearLevel: "g11"
    });

    const columns : Column[] = [
        {
            label: "Room",
            display(row: Subject) {
                return <div>{row.room}</div>
            },
        },
        {
            label: "Name",
            display(row: Subject) {
                return <div>{row.name}</div>
            },
        }
    ]

    return (
        <>
            <SearchFilter />
            <DataTable 
                columns={columns}
                rows={data}
            />
        </>
    )
}