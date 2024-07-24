import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { listToTree } from "@/utils/index";
import { ITab, IUser } from "@/types";
import { IMenu, IMenubar } from "@/types";
import { getUserByUserName } from "@/api/system/user";
import { getPermission as getPer } from "@/api/auth";

interface IUserState {
  user: IUser;
  permissionMenuList: Array<IMenu>;
  menuList: Array<IMenubar>;
  permissionBtns: Array<IMenu>;
  permissionBtn: object;
}

export const getPermission = createAsyncThunk(
  "user/getPermission",
  async (id: string) => {
    const userId = id;
    const res = await getPer(userId);
    return res;
  }
);
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userName: string) => {
    const res = await getUserByUserName(userName);
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
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
        createTime: "",
      },
      permissionMenuList: [],
      menuList: [],
      permissionBtns: [],
      permissionBtn: {},
    };
  },
  reducers: {
    getPermissionBtns: (state, action: PayloadAction<ITab>) => {
      const { payload: activeTab } = action;
      const menuPermission = state.permissionMenuList.filter(
        (x) => x.id?.toString() === activeTab.id
      );
      if (menuPermission && menuPermission[0]) {
        const btns = state.permissionMenuList.filter(
          (x) => x.pId === menuPermission[0].id
        );
        const permission = {};
        btns.forEach((element) => {
          permission[element.menuCode] = true;
        });
        state.permissionBtn = permission;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPermission.fulfilled, (state, { payload }) => {
        const { data: userPermissionMenuList } = payload;
        state.permissionMenuList = userPermissionMenuList;
        const dt = JSON.parse(JSON.stringify(userPermissionMenuList));
        // const userMenuList = menuFormat(dt)
        const dtNew = dt.filter((x: any) => x.menuType !== 2);
        const userMenuList = listToTree(dtNew, 0, {
          pId: "pId",
        });
        const m = JSON.parse(JSON.stringify(userMenuList));
        state.menuList = m;
        return state;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        const { data: user } = payload;
        state.user = user;
        return state;
      });
  },
});

export const { getPermissionBtns } = userSlice.actions;
const { reducer } = userSlice;
export default reducer;
