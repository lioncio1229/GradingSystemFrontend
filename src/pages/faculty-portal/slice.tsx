import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Subject } from "services/types";
import { Item } from "components/SelectWrapper";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InitialState {
    subjects: Item[],
}

const initialState : InitialState = {
    subjects: [],
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
    }
});

const selectAdminPortal = (state : RootState) => state.facultyPortal;

export const subjectsSelector = createSelector(selectAdminPortal, state => state.subjects);

export const { setSubjects } = facultyPortalSlice.actions;
export default facultyPortalSlice.reducer;