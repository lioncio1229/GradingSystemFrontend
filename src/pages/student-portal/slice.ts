import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { Student } from "services/types";


interface StudentSlice {
    studentInfo: Student | null
}

const initialState : StudentSlice = {
    studentInfo: null
}

export const studentSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<Student>) => {
            state.studentInfo = action.payload;
        }
    }
});

const selectState = (state : RootState) => state.studentInfo;
export const studentSelector = createSelector(selectState, state => state.studentInfo);

export const { setStudent } = studentSlice.actions;
export default studentSlice.reducer;