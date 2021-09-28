import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import reportApi from "../../api/reportApi"

export const getReportTypeAction = createAsyncThunk(
    "report/getALl",
    async () => {
        const response = await reportApi.getReportType()
        return response
    }
)
export const reportPostAction = createAsyncThunk(
    "report/reportPostAction",
    async (data) => {
        const response = await reportApi.postReportPost(data)
        return response
    }
)
export const reportAuctionAction = createAsyncThunk(
    "report/reportAuctionAction",
    async (data) => {
        const response = await reportApi.postReportAuction(data)
        return response
    }
)

const reportTypeSlice = createSlice({
    name: "reportType",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(getReportTypeAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload.results)
        })
        builder.addCase(getReportTypeAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
            })
        })
    },
})

export default reportTypeSlice.reducer
