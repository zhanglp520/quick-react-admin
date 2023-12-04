import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITab } from "@/types";

interface ITabState {
    activeTab: ITab;
    tabList: Array<ITab>;
}

export const tabSlice = createSlice({
    name: 'tab',
    initialState: (): ITabState => {
        return {
            activeTab: {
                id: "home",
                name: "首页",
                path: "/home"
            },
            tabList: [
                {
                    id: "home",
                    name: "首页",
                    path: "/home"
                }
            ]
        };
    },
    reducers: {
        setActiveTab: (state, action: PayloadAction<ITab>) => {
            const { payload: tab } = action
            state.activeTab = tab
        },
        addTab: (state, action: PayloadAction<ITab>) => {
            const { payload: tab } = action
            const index = state.tabList.findIndex((x) => x.id === tab.id);
            if (index === -1) {
                state.tabList.push(tab);
            }
            setActiveTab(tab);
        },
        deleteTab: (state, action: PayloadAction<string>) => {
            const { payload: id } = action
            if (id !== "home") {
                const index = state.tabList.findIndex((x) => x.id === id);
                const activeTab =
                    state.tabList[index + 1] || state.tabList[index - 1];
                setActiveTab(activeTab);
                state.tabList = state.tabList.filter((x) => x.id !== id);
            }
        },
        clear: (state) => {
            state.tabList = state.tabList.filter((x) => x.id === "home");
        },
    }
})

export const { setActiveTab, addTab, deleteTab, clear } = tabSlice.actions;
export default tabSlice.reducer;
