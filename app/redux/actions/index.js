import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import reportApi from "../../api/reportApi"
import userApi from "../../api/userApi"
export * from "./auctionAction"
export * from "./postAction"

const logout = createAction("USER_LOGOUT")

export const logoutAction = createAsyncThunk(
    "USER_LOGOUT",
    async (data, thunkAPI) => {
        await userApi.deleteTokenUser()
        thunkAPI.dispatch(logout())
        return { res: "success" }
    }
)

export const loginAction = createAsyncThunk(
    "auth/getToken",
    async (data, thunkAPI) => {
        const response = await userApi.login(data)
        return response
    }
)

export const postFeedbackAction = createAsyncThunk(
    "feedback/postFeedback",
    async (data, thunkAPI) => {
        const response = await reportApi.postFeedback(data)
        return response
    }
)

export const loginByGoogleAction = createAsyncThunk(
    "login/loginByGG",
    async (data, thunkAPI) => {
        const response = await userApi.loginByGG(data)
        return response
    }
)

export const loginByFacebookAction = createAsyncThunk(
    "login/loginByFacebookAction",
    async (data, thunkAPI) => {
        const response = await userApi.loginByFB(data)
        return response
    }
)
