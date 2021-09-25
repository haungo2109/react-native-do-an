import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi"

export const logoutAction = createAction("USER_LOGOUT")

export const loginAction = createAsyncThunk(
    "auth/getToken",
    async (data, thunkAPI) => {
        const response = await userApi.login(data)
        return response
    }
)
