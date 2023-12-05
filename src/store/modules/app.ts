import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


interface IAppState {
    language: string;
    collapsed: boolean;
}

export const appSlice = createSlice({
    name: 'app',
    initialState: (): IAppState => {
        return {
            language: "zh",
            collapsed: false
        };
    },
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            const { payload: language } = action
            state.language = language;
        },
        setCollapse: (state, action: PayloadAction<boolean>) => {
            const { payload: collapsed } = action
            state.collapsed = collapsed;
        },
    }
})

export const { setLanguage, setCollapse } = appSlice.actions;
export default appSlice.reducer;
