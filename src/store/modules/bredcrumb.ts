import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


interface IbredcrumbState {
    language: string;
    isCollapse: boolean;
}

export const bredcrumbSlice = createSlice({
    name: 'bredcrumb',
    initialState: (): IbredcrumbState => {
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

export const { setLanguage, setCollapse } = bredcrumbSlice.actions;
export default bredcrumbSlice.reducer;
