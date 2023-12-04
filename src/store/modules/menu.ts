import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMenuTree } from "@/types";


interface IMenuState {
    activeMenuId: string;
    permissionMenuTreeList: Array<IMenuTree>;
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState: (): IMenuState => {
        return {
            activeMenuId: "home",
            permissionMenuTreeList: []
        };
    },
    reducers: {
        setActiveMenuId: (state, action: PayloadAction<string>) => {
            const { payload: activeMenuId } = action
            state.activeMenuId = activeMenuId;
        },
        clear: (state) => {
            state.permissionMenuTreeList = [];
        },
    }
})

export const { setActiveMenuId, clear } = menuSlice.actions;
export default menuSlice.reducer;
