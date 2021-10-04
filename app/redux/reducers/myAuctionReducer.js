import { createSlice } from "@reduxjs/toolkit"
import {
    changeStatusAuctionComment,
    deleteAuctionAction,
    dislikeAuction,
    getMoreMyAuctionAction,
    getMyAuction,
    likeAuction,
    postAuctionAction,
    setFailAuctionAction,
    updateAuction,
} from "../actions"

const myAuctionSlice = createSlice({
    name: "myAuction",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getMoreMyAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMyAuction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMyAuction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getMyAuction.pending, (state, action) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(likeAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(dislikeAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(deleteAuctionAction.fulfilled, (state, action) => {
            let id = action.meta.arg
            let newState = state.data.filter((c) => c.id !== id)
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(deleteAuctionAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
            })
        })
        builder.addCase(postAuctionAction.fulfilled, (state, action) => {
            let auction = action.payload
            state = Object.assign(state, {
                data: [...state.data, auction],
                error: "",
                loading: false,
            })
        })
        builder.addCase(postAuctionAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(postAuctionAction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(updateAuction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, {
                data: newState,
                error: "",
                loading: false,
            })
        })
        builder.addCase(setFailAuctionAction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, {
                data: newState,
                error: "",
                loading: false,
            })
        })
        builder.addCase(
            changeStatusAuctionComment.fulfilled,
            (state, action) => {
                let { comment_id, status_transaction, auction_id, ...rest } =
                    action.payload
                let newState = state.data.map((c) =>
                    c.id != auction_id ? c : { ...c, ...rest }
                )
                state = Object.assign(state, {
                    data: newState,
                    error: "",
                    loading: false,
                })
            }
        )
        builder.addCase(updateAuction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(updateAuction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
    },
})

export default myAuctionSlice.reducer
