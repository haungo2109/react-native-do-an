import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import reportApi from "../../api/reportApi"

export const getReportTypeAction = createAsyncThunk(
    "report/getALl",
    async () => {
        const response = await reportApi.getReportType()
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
