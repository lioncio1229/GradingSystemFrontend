import { strandsSelector, semestersSelector, yearLevelsSelector, Academic } from "../slice";
import { useSelector } from "react-redux";

export default function useAcademic() : Academic{
    const strands = useSelector(strandsSelector);
    const semesters = useSelector(semestersSelector);
    const yearLevels = useSelector(yearLevelsSelector);

    return {
        strands,
        semesters,
        yearLevels,
    }
}