import { createSlice } from "@reduxjs/toolkit"
import {
    changeStatusAuctionComment,
    deleteAuctionAction,
    dislikeAuction,
    getAllAuctionAction,
    getMoreAuctionAction,
    getOneAuctionAction,
    likeAuction,
    postAuctionAction,
    setFailAuctionAction,
    updateAuction,
    postMomoPayAction,
} from "../actions"

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMoreAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getOneAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, action.payload],
                loading: false,
                error: "",
            })
        })
        builder.addCase(getAllAuctionAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getAllAuctionAction.pending, (state, action) => {
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
        builder.addCase(postMomoPayAction.fulfilled, (state, action) => {
            let {
                auction_id,
                status_auction,
                date_success,
                accept_price,
                buyer,
            } = action.payload

            let newState = state.data.map((c) =>
                c.id != auction_id
                    ? c
                    : {
                          ...c,
                          status_auction,
                          date_success,
                          accept_price,
                          buyer,
                      }
            )
            state = Object.assign(state, {
                data: newState,
                error: "",
                loading: false,
            })
        })
    },
})

export default auctionSlice.reducer
