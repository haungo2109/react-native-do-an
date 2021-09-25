import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import categoryAuctionApi from "../../api/categoryAuctionApi"

export const getCategoryAction = createAsyncThunk(
    "category/getALl",
    async () => {
        const response = await categoryAuctionApi.getCategoryAuction()
        return response
    }
)

const categoryAuctionSlice = createSlice({
    name: "categoryAuction",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(getCategoryAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload.results)
        })
        builder.addCase(getCategoryAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
            })
        })
    },
})

export default categoryAuctionSlice.reducer
