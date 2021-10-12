import { createAsyncThunk } from "@reduxjs/toolkit"
import reportApi from "../../api/reportApi"
import userApi from "../../api/userApi"
export * from "./auctionAction"
export * from "./postAction"

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
