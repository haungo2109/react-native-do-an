import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/apiClient"
import postApi from "../../api/postApi"
import { logoutAction } from "../actions"

export const getAllPostAction = createAsyncThunk(
    "post/fetchAllPost",
    async (params) => {
        const response = await postApi.getPosts(params)
        return response
    }
)
export const getMorePostAction = createAsyncThunk(
    "post/fetchMorePost",
    async (nextPageUrl) => {
        const response = await api.get(nextPageUrl)
        return response
    }
)
export const getOnePostAction = createAsyncThunk(
    "auction/fetchOnePost",
    async (id) => {
        const response = await postApi.getPost(id)
        return response
    }
)
export const getMyPost = createAsyncThunk("post/fetchMyPost", async () => {
    const response = await postApi.getPostOwner()
    return response
})
export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({ id, data }) => {
        const response = await postApi.patchPost(id, data)
        return response
    }
)
export const postPostAction = createAsyncThunk(
    "post/postPost",
    async (data) => {
        const response = await postApi.postPost(data)
        return response
    }
)
export const deletePostAction = createAsyncThunk(
    "post/deletePost",
    async (id) => {
        const response = await postApi.deletePost(id)
        return response
    }
)

export const likePost = createAsyncThunk("post/like", async (postId) => {
    const response = await postApi.increatePostVote(postId)
    return response
})

export const dislikePost = createAsyncThunk("post/dislike", async (postId) => {
    const response = await postApi.decreatePostVote(postId)
    return response
})

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
            // state.data = state.data.concat(action.payload.results)
            // state.nextPage = action.payload.next
            // state = Object.assign(state, {
            //     data: state.data.concat(action.payload.results),
            //     nextPage: action.payload.next,
            //     loading: false,
            //     error: "",
            // })
            state = Object.assign(state, {
                data: [...state.data, ...action.payload.results],
                nextPage: action.payload.next,
                loading: false,
                error: "",
            })
        })
        builder.addCase(getMyPost.fulfilled, (state, action) => {
            state = Object.assign(state, {
                data: action.payload,
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
        builder.addCase(getMyPost.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(getMyPost.pending, (state, action) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(likePost.fulfilled, (state, action) => {
            let data = action.payload
            let newState = state.data.map((c) =>
                c.id != data["id"] ? c : data
            )
            state = Object.assign(state, { data: newState })
        })
        builder.addCase(dislikePost.fulfilled, (state, action) => {
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
        builder.addCase(postPostAction.fulfilled, (state, action) => {
            let post = action.payload
            state = Object.assign(state, {
                data: [...state.data, post],
                error: "",
                loading: false,
            })
        })
        builder.addCase(postPostAction.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(postPostAction.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
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
        builder.addCase(updatePost.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknow error",
                loading: false,
            })
        })
        builder.addCase(updatePost.pending, (state, action) => {
            state = Object.assign(state, { loading: true })
        })
        builder.addCase(logoutAction, (state) => {
            state = {
                page: 1,
                data: [],
                error: "",
                loading: false,
                nextPage: "",
            }
        })
    },
})

export default postSlice.reducer
