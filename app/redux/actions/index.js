import { createAsyncThunk } from "@reduxjs/toolkit"
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
