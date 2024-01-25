import { useState } from "react";
import DataTable, { Column } from "components/DataTable"
import { useGetAllSubjectsQuery } from "services/subjectServices"
import { Stack } from "@mui/material"
import { Subject } from "services/types";
import SearchFilter, { Filter } from "../common/SearchFilter";


export default function Subjects()
{
    const [filter, setFilter] = useState<Filter>({
        semester: "sem1",
        strand: "ICT",
        yearLevel: "g11",
    });

    const { data } = useGetAllSubjectsQuery(filter);

    const columns : Column<Subject>[] = [
        {
            label: "Name",
            display: row => row.name,
        },
        {
            label: "Code",
            display: row => row.code
        },
        {
            label: "Type",
            display: row => row.type
        },
        {
            label: "Structor",
            display: row => row.faculty.firstName + " " + row.faculty.lastName
        }
    ]

    const handleFilterChange = (updatedFilter: Filter) => {
        setFilter(updatedFilter);
    }

    return (
        <Stack spacing={2}>
            <SearchFilter 
                filter={filter}
                onChange={handleFilterChange} 
            />

            <DataTable 
                columns={columns}
                rows={data}
            />
        </Stack>
    )
}