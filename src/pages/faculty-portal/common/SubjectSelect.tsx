import { useState, useEffect } from "react";
import { Stack, SelectChangeEvent } from "@mui/material"
import SelectWrapper from "components/SelectWrapper";
import { useSelector } from "react-redux";
import { subjectsSelector } from "../slice";

type SubjectSelectProps = {
    value?: string,
    onChange?: (subject: string) => void,
}

export default function SubjectSelect({ value = "", onChange } : SubjectSelectProps)
{
    const subjects = useSelector(subjectsSelector);
    const [subject, setSubject] = useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        const subjectSelect = event.target.value;
        setSubject(subjectSelect);
        onChange?.(subjectSelect);
    };

    useEffect(() => {
        setSubject(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Stack flexDirection="row" gap={2}>
            <SelectWrapper
                items={subjects}
                label="Subjects"
                value={subject}
                onChange={handleChange}
                fullWidth={false}
            />
        </Stack>
    )
}