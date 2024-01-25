import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetStrandsQuery, useGetSemestersQuery, useGetYearLevelsQuery } from "services/academicLevelServices";
import { setStrands, setSemesters, setYearLevels } from "./slice";

export default function AdminPortal()
{
    const dispatch = useDispatch();
    const { data: strands } = useGetStrandsQuery(null);
    const{ data: semesters } = useGetSemestersQuery(null);
    const { data: yearLevels } = useGetYearLevelsQuery(null);

    useEffect(() => {
        if(strands)
            dispatch(setStrands(strands));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [strands]);

    useEffect(() => {
        if(semesters)
            dispatch(setSemesters(semesters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesters]);

    useEffect(() => {
        if(yearLevels)
            dispatch(setYearLevels(yearLevels));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearLevels]);

    return <Outlet />
}