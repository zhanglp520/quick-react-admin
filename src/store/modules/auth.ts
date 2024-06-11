import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginParams, IToken } from "@/types";
import { encryptForMd5 } from "@/utils/crypto";
import { userLogin, refreshToken } from "@/api/auth";

interface ILoginState {
  quickAccessToken: string;
  quickRefreshToken: string;
  expiresIn: number;
  tenantId: string;
  userName: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (form: ILoginParams) => {
    const { tenantId, username, password } = form;
    const res = await userLogin({
      tenantId,
      username,
      password: encryptForMd5(password),
    });

    return res;
  }
);
export const refresh = createAsyncThunk(
  "auth/refreshToken",
  async (token: IToken) => {
    const res = await refreshToken(token);
    return res;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: (): ILoginState => {
    return {
      quickAccessToken: "",
      quickRefreshToken: "",
      expiresIn: 0,
      tenantId: "",
      userName: "",
    };
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        const { data: loginData } = payload;
        const { quickAccessToken, quickRefreshToken, expiresIn, tenantId } =
          loginData;
        if (quickAccessToken) {
          state.quickAccessToken = quickAccessToken;
        }
        if (quickRefreshToken) {
          state.quickRefreshToken = quickRefreshToken;
        }
        if (expiresIn) {
          state.expiresIn = expiresIn;
        }
        if (tenantId) {
          state.tenantId = tenantId;
        }
        // state.tenantId = tenantId;
        // state.userName = username;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        const { data: loginData } = payload;
        const { quickAccessToken, quickRefreshToken, expiresIn, tenantId } =
          loginData;
        if (quickAccessToken) {
          state.quickAccessToken = quickAccessToken;
        }
        if (quickRefreshToken) {
          state.quickRefreshToken = quickRefreshToken;
        }
        if (expiresIn) {
          state.expiresIn = expiresIn;
        }
        if (tenantId) {
          state.tenantId = tenantId;
        }
      });
  },
});

export default authSlice.reducer;
