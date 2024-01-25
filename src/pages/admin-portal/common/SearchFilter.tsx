import { useState, useEffect } from "react";
import { Stack, SelectChangeEvent } from "@mui/material"
import SelectWrapper from "components/SelectWrapper";
import { useSelector } from "react-redux";
import { strandsSelector, semestersSelector, yearLevelsSelector } from "../slice";

export type Filter = {
    semester: string,
    strand: string,
    yearLevel: string,
}

type SearchFilterProps = {
    filter: Filter,
    onChange?: (filter: Filter) => void,
}

export default function SearchFilter({ filter : _filter = {
    semester: "",
    strand: "",
    yearLevel: "",
}, onChange } : SearchFilterProps)
{
    const strands = useSelector(strandsSelector);
    const semesters = useSelector(semestersSelector);
    const yearLevels = useSelector(yearLevelsSelector);

    const [filter, setFilter] = useState<Filter | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        const newFilterValue = {...filter, [event.target.name]: event.target.value};
        setFilter(newFilterValue as Filter);
        onChange?.(newFilterValue as Filter);
    };

    useEffect(() => {
        setFilter(_filter);
    }, [_filter]);

    return (
        <Stack flexDirection="row" gap={2}>
            <SelectWrapper
                items={strands}
                label="Strands"
                name="strand"
                value={filter?.strand ?? ""}
                onChange={handleChange}
            />
            <SelectWrapper
                items={semesters}
                label="Semesters"
                name="semester"
                value={filter?.semester ?? ""}
                onChange={handleChange}
            />
            <SelectWrapper
                items={yearLevels}
                label="Year Levels"
                name="yearLevel"
                value={filter?.yearLevel ?? ""}
                onChange={handleChange}
            />
        </Stack>
    )
}