import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi"
import converUri from "../../utils/ConverUri"
import { logoutAction } from "../actions"

export const getCurrenUserAction = createAsyncThunk(
    "users/fetchCurrentUser",
    async () => {
        const response = await userApi.getCurrentUserInfo()
        return response
    }
)
export const getUserBaseInfoAction = createAsyncThunk(
    "users/getUserBaseInfoAction",
    async (uid) => {
        const response = await userApi.getUserInfo(uid)
        return response
    }
)
export const pushTokenUserAction = createAsyncThunk(
    "users/postPushTokenUser",
    async (data) => {
        const response = await userApi.pushTokenUser(data)
        return response
    }
)
export const registerUserAction = createAsyncThunk(
    "users/registerUser",
    async (data) => {
        const response = await userApi.register(data)
        return response
    }
)
export const updateCurrenUserAction = createAsyncThunk(
    "users/updateCurrentUser",
    async ({ id, data }) => {
        const response = await userApi.updateCurrentUserInfo(id, data)
        return response
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrenUserAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload)
        })
        builder.addCase(pushTokenUserAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload)
        })
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload)
        })
        builder.addCase(updateCurrenUserAction.fulfilled, (state, action) => {
            action.payload.avatar = converUri(action.payload.avatar)
            state = Object.assign(state, action.payload)
        })
        builder.addCase(getCurrenUserAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
            })
        })
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
            })
        })
        builder.addCase(logoutAction, (state) => {
            state = {}
        })
    },
})

export default userSlice.reducer
