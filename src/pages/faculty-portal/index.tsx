import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetSubjectsByFacultyMutation } from "services/subjectServices";
import useUserInfo from "hooks/useUserInfo";
import { setSubjects, setSubjectsRaw } from "./slice";

export default function FacultyPortal()
{
    const userData = useUserInfo();
    const dispatch = useDispatch();
    const [getSubjects] = useGetSubjectsByFacultyMutation();

    useEffect(() => {
        if(userData.id === "") return;

        getSubjects({facultyId: userData.id}).unwrap().then(resp => {
            dispatch(setSubjects(resp));
            dispatch(setSubjectsRaw(resp));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.id]);

    return <Outlet />
}