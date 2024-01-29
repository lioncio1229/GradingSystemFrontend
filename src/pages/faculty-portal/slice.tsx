import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Subject } from "services/types";
import { Item } from "components/SelectWrapper";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InitialState {
    subjects: Item[],
    rawSubjects: Subject[],
}

const initialState : InitialState = {
    subjects: [],
    rawSubjects: [],
}

export const facultyPortalSlice = createSlice({
    name: "facultyPortal",
    initialState,
    reducers: {
        setSubjects: (state, action: PayloadAction<Subject[]>) => {
            state.subjects = action.payload.map(item => ({
                key: item.id,
                value: item.id,
                label: item.name,
                displayData: () => `${item.strand.code}, ${item.yearLevel.name}, ${item.semester.name}`
            }))
        },
        setSubjectsRaw: (state, action: PayloadAction<Subject[]>) => {
            state.rawSubjects = action.payload;
        }
    }
});

const selectAdminPortal = (state : RootState) => state.facultyPortal;

export const subjectsSelector = createSelector(selectAdminPortal, state => state.subjects);
export const rawSubjectSelector = createSelector(selectAdminPortal, state => state.rawSubjects);

export const { setSubjects, setSubjectsRaw } = facultyPortalSlice.actions;
export default facultyPortalSlice.reducer;