import { configureStore } from '@reduxjs/toolkit';
import { pomoSettingsSlice } from '../features/pomodoro/pomodoro-settings-overlay';
import { standardPomoSlice } from '../features/pomodoro/standard-pomodoro-slice';


export const store = configureStore({
    reducer:{
        standardPomo: standardPomoSlice.reducer,
        pomoSettingsOverlay: pomoSettingsSlice.reducer
    }
})