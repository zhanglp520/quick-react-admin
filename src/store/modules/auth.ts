import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginParams, IToken } from "@/types";
import { encryptForMd5 } from "@/utils/crypto";
import { userLogin, refreshToken } from "@/api/auth";

interface ILoginState {
    quickAccessToken: string;
    quickRefreshToken: string;
    expiresIn: number;
    tenant: string;
    userName: string;
}

export const login = createAsyncThunk('auth/login',
    async (form: ILoginParams) => {
        const { tenant, username, password } = form;
        const res = await userLogin({
            tenant,
            username,
            password: encryptForMd5(password)
        })
        return res;
    }
);
export const refresh = createAsyncThunk('auth/refreshToken',
    async (token: IToken) => {
        const res = await refreshToken(token)
        return res;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: (): ILoginState => {
        return {
            quickAccessToken: "",
            quickRefreshToken: "",
            expiresIn: 0,
            tenant: "",
            userName: ""
        };
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                const { data: loginData } = payload;
                const {
                    quickAccessToken,
                    quickRefreshToken,
                    expiresIn
                } = loginData;
                if (quickAccessToken) {
                    state.quickAccessToken = quickAccessToken;
                }
                if (quickRefreshToken) {
                    state.quickRefreshToken = quickRefreshToken;
                }
                if (expiresIn) {
                    state.expiresIn = expiresIn;
                }
                // state.tenant = tenant;
                // state.userName = username;
            })
            .addCase(refresh.fulfilled, (state, { payload }) => {
                const { data: loginData } = payload;
                const {
                    quickAccessToken,
                    quickRefreshToken,
                    expiresIn
                } = loginData;
                if (quickAccessToken) {
                    state.quickAccessToken = quickAccessToken;
                }
                if (quickRefreshToken) {
                    state.quickRefreshToken = quickRefreshToken;
                }
                if (expiresIn) {
                    state.expiresIn = expiresIn;
                }
            })
    }
})

export default authSlice.reducer;
