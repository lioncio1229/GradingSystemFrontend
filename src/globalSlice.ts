import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface ErrorPopup {
    isOpen: boolean,
    description: string,
}

interface GlobalSlice {
    isBarLoading: boolean,
    errorPopup: ErrorPopup,
}

const initialState : GlobalSlice = {
    isBarLoading: false,
    errorPopup: {
        isOpen: false,
        description: "",
    }
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setBarLoading: (state, action: PayloadAction<boolean>) => {
            state.isBarLoading = action.payload;
        },
        setErrorOpen: (state, action: PayloadAction<ErrorPopup>) => {
            state.errorPopup = action.payload
        }
    }
});

const selectGlobal = (state : RootState) => state.global;

export const barLoadingSelector = createSelector(selectGlobal, state => state.isBarLoading);
export const errorPopupSelector = createSelector(selectGlobal, state => state.errorPopup);

export const { setBarLoading, setErrorOpen } = globalSlice.actions;
export default globalSlice.reducer;