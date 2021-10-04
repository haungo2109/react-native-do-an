import { createSlice } from "@reduxjs/toolkit"
import {
    dislikeAuction,
    getAuctionYouJoin,
    getMoreJoinAuctionAction,
    likeAuction,
    postMomoPayAction,
} from "../actions"

const auctionJoinSlice = createSlice({
    name: "auctionJoin",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getMoreJoinAuctionAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getAuctionYouJoin.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
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

export default auctionJoinSlice.reducer
