import { useState, useMemo, useEffect } from "react";
import { Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { useGetStrandsQuery, useGetSemestersQuery, useGetYearLevelsQuery } from "services/academicLevelServices";
import { Strand, Semester, YearLevel } from "services/types";

type Item = {
    key: string,
    value: string,
    label: string,
}

type FilterSelectProps = {
    items: Item[],
    value: string,
    label: string,
    name: string,
    onChange: (event: SelectChangeEvent) => void,
}

export type Filter = {
    semester: string,
    strand: string,
    yearLevel: string,
}

function FilterSelect ({
    items = [],
    value,
    label,
    name,
    onChange,
} : FilterSelectProps) : JSX.Element {
    return (
        <FormControl fullWidth>
            <InputLabel id="select">{label}</InputLabel>
            <Select
            labelId="select"
            id="select"
            value={value}
            label={label}
            onChange={onChange}
            name={name}
            >
                {
                    items.map(item => (
                        <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
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
    const { data: strands = [] } = useGetStrandsQuery(null);
    const{ data: semesters = [] } = useGetSemestersQuery(null);
    const { data: yearLevels = [] } = useGetYearLevelsQuery(null);
    const [filter, setFilter] = useState<Filter | null>(null);

    const strandList : Item[] = useMemo(() => strands.map((o : Strand) => ({
        key: o.code,
        value: o.code,
        label: o.description,
    } as Item)), [strands]);

    const semesterList : Item[] = useMemo(() => semesters.map((o : Semester) => ({
        key: o.key,
        value: o.key,
        label: o.name,
    } as Item)), [semesters]);

    const yearLevelList : Item[] = useMemo(() => yearLevels.map((o : YearLevel) => ({
        key: o.key,
        value: o.key,
        label: o.name,
    } as Item)), [yearLevels]);

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
            <FilterSelect
                items={strandList}
                label="Strands"
                name="strand"
                value={filter?.strand ?? ""}
                onChange={handleChange}
            />
            <FilterSelect
                items={semesterList}
                label="Semesters"
                name="semester"
                value={filter?.semester ?? ""}
                onChange={handleChange}
            />
            <FilterSelect
                items={yearLevelList}
                label="Year Levels"
                name="yearLevel"
                value={filter?.yearLevel ?? ""}
                onChange={handleChange}
            />
        </Stack>
    )
}