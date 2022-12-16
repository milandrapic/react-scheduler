import { createSlice } from "@reduxjs/toolkit";

const initialOverlayState = {
    isActive: false,
    isCustom: false
}

export const pomoSettingsSlice = createSlice({
    name: "overlay",
    initialState: initialOverlayState,
    reducers: {
        toggleOverlay: (state) => {
            state.isActive = !state.isActive;
        },
        toggleCustom: (state) => {
            state.isCustom = !state.isCustom;
        }
    }
})