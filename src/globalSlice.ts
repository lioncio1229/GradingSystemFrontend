import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

const initialState = {
    isBarLoading: false,
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setBarLoading: (state, action) => {
            state.isBarLoading = action.payload;
        }
    }
});

const selectGlobal = (state : RootState) => state.global;
export const barLoadingSelector = createSelector(selectGlobal, state => state.isBarLoading);

export const { setBarLoading } = globalSlice.actions;
export default globalSlice.reducer;