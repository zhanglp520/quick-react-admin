import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listToTableTree } from "@/utils/index";
import { IUser } from "@/types";
import { IMenu, IMenubar } from "@/types";
import { getUserByUserName } from "@/api/system/user";
import { getPermission } from "@/api/auth";
// import { useTabStore } from "@/store/modules/tab";

interface IUserState {
    user: IUser;
    permissionMenuList: Array<IMenu>;
    menuList: Array<IMenubar>;
    permissionBtns: Array<IMenu>;
}

export const getPermission1 = createAsyncThunk('user/getPermission1',
    async (id: string) => {
        const userId = id;
        const res = await getPermission(userId)
        return res;
    }
);
export const getUserInfo = createAsyncThunk('user/getUserInfo',
    async (userName: string) => {
        const res = await getUserByUserName(userName)
        return res;
    }
);

//getters
// getPermissionBtns<T>() {
//     const tabStore = useTabStore();
//     const activeTab = tabStore.getActiveTab;
//     const menuPermission = this.permissionMenuList.filter(
//         (x) => x.id?.toString() === activeTab.id
//     );
//     if (menuPermission && menuPermission[0]) {
//         const btns = this.permissionMenuList.filter(
//             (x) => x.pId === menuPermission[0].id
//         );
//         const permission = {};
//         btns.forEach((element) => {
//             permission[element.menuId] = true;
//         });
//         return permission as T;
//     }
//     return null;
// },

export const userSlice = createSlice({
    name: 'user',
    initialState: (): IUserState => {
        return {
            user: {
                id: undefined,
                userId: "",
                userName: "",
                fullName: "",
                phone: "",
                avatar: "",
                email: "",
                address: "",
                createTime: ""
            },
            permissionMenuList: [],
            menuList: [],
            permissionBtns: []
        };
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getPermission1.fulfilled, (state, { payload }) => {                
                const { data: userPermissionMenuList } = payload;
                state.permissionMenuList = userPermissionMenuList;
                const dt = JSON.parse(
                    JSON.stringify(userPermissionMenuList)
                );
                // const userMenuList = menuFormat(dt)
                const dtNew = dt.filter((x: any) => x.menuType !== 2);
                const userMenuList = listToTableTree(dtNew, 0, {
                    pId: "pId"
                });
                const m = JSON.parse(JSON.stringify(userMenuList));
                state.menuList = m;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                const { data: user } = payload;
                state.user = user;
            })
    }
})

export const { } = userSlice.actions;
export default userSlice.reducer;