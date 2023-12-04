import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


interface IAppState {
    language: string;
    isCollapse: boolean;
}

export const appSlice = createSlice({
    name: 'app',
    initialState: (): IAppState => {
        return {
            language: "zh",
            isCollapse: false
        };
    },
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            const { payload: language } = action
            state.language = language;
        },
        setCollapse: (state, action: PayloadAction<boolean>) => {
            const { payload: isCollapse } = action
            state.isCollapse = isCollapse;
        },
    }
})

export const { setLanguage, setCollapse } = appSlice.actions;
export default appSlice.reducer;
