import { createSlice } from "@reduxjs/toolkit"
import {
    dislikePostAction,
    getPostOfUserAction,
    getMorePostOfUserAction,
    likePostAction,
} from "../actions"

const postUserSlice = createSlice({
    name: "postUser",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getPostOfUserAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMorePostOfUserAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getPostOfUserAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getPostOfUserAction.pending, (state, action) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(likePostAction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(dislikePostAction.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
    },
})

export default postUserSlice.reducer
