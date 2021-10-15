import { createSlice } from "@reduxjs/toolkit"
import {
    deletePostAction,
    dislikePostAction,
    getAllPostAction,
    getMorePostAction,
    likePostAction,
    postPostAction,
    updatePostAction,
} from "../actions"

const postSlice = createSlice({
    name: "post",
    initialState: {
        page: 1,
        data: [],
        error: "",
        loading: false,
        nextPage: "",
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPostAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload.results,
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMorePostAction.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getAllPostAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getAllPostAction.pending, (state, action) => {
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
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
            let id = action.meta.arg
            let newState = state.data.filter((c) => c.id !== id)
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(deletePostAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
            })
        })
        // builder.addCase(postPostAction.fulfilled, (state, action) => {
        //     let post = action.payload
        //     state = Object.assign(state, {
        //         data: [...state.data, post],
        //         error: "",
        //         loading: false,
        //     })
        // })
        builder.addCase(postPostAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(postPostAction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(updatePostAction.fulfilled, (state, action) => {
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
        builder.addCase(updatePostAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(updatePostAction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
    },
})

export default postSlice.reducer
