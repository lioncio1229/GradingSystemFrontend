import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Strand, Semester, YearLevel } from "services/types";
import { Item } from "components/SelectWrapper";
import type { PayloadAction } from '@reduxjs/toolkit'

interface AdminPortal {
    strands: Item[],
    semesters: Item[],
    yearLevels: Item[],
}

const initialState : AdminPortal = {
    strands: [],
    semesters: [],
    yearLevels: [],
}

export const adminPortalSlice = createSlice({
    name: "adminPortal",
    initialState,
    reducers: {
        setStrands: (state, action: PayloadAction<Strand[]>) => {
            state.strands = action.payload.map(item => ({
                key: item.code,
                value: item.code,
                label: item.description,
            }))
        },
        setSemesters: (state, action: PayloadAction<Semester[]>) => {
            state.semesters = action.payload.map(item => ({
                key: item.key,
                value: item.key,
                label: item.name
            }))
        },
        setYearLevels: (state, action: PayloadAction<YearLevel[]>) => {
            state.yearLevels = action.payload.map(item => ({
                key: item.key,
                value: item.key,
                label: item.name
            }))
        }
    }
});

const selectAdminPortal = (state : RootState) => state.adminPortal;

export const strandsSelector = createSelector(selectAdminPortal, state => state.strands);
export const semestersSelector = createSelector(selectAdminPortal, state => state.semesters);
export const yearLevelsSelector = createSelector(selectAdminPortal, state => state.yearLevels);

export const { setStrands, setSemesters, setYearLevels } = adminPortalSlice.actions;
export default adminPortalSlice.reducer;