import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import auctionApi from "../../api/auctionApi"
import postApi from "../../api/postApi"
import { logoutAction } from "../actions"

export const fetchPostComment = createAsyncThunk(
    "comment/fetchPostComment",
    async (id, thunkAPI) => {
        const response = await postApi.getPostComment(id)
        return response
    }
)
export const fetchAuctionComment = createAsyncThunk(
    "comment/fetchAuctionComment",
    async (id, thunkAPI) => {
        const response = await auctionApi.getAuctionComment(id)
        return response
    }
)
export const sendPostComment = createAsyncThunk(
    "comment/sendPostComment",
    async ({ id, data }, thunkAPI) => {
        const response = await postApi.createPostComment(id, data)
        return response
    }
)
export const sendAuctionComment = createAsyncThunk(
    "comment/sendAuctionComment",
    async ({ id, data }, thunkAPI) => {
        const response = await auctionApi.createOrUpdateAuctionComment(id, data)
        return response
    }
)

const commentSlice = createSlice({
    name: "comment",
    initialState: { error: "", data: [], loading: false },
    reducers: {
        changeStatusCommentAuction: (state, action) => {
            const { status_transaction, comment_id } = action.payload

            let newState = state.data.map((c) =>
                c.id == comment_id ? { ...c, status_transaction } : c
            )
            state = Object.assign(state, { data: newState })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostComment.fulfilled, (state, action) => {
            state = Object.assign(state, {
                ...state,
                data: action.payload,
                loading: false,
            })
        })
        builder.addCase(fetchAuctionComment.fulfilled, (state, action) => {
            state = Object.assign(state, {
                ...state,
                data: action.payload,
                loading: false,
            })
        })
        builder.addCase(sendPostComment.fulfilled, (state, action) => {
            state.data.push(action.payload)
            state.loading = false
        })
        builder.addCase(sendAuctionComment.fulfilled, (state, action) => {
            state = Object.assign(state, { data: [action.payload] })
            state.loading = false
        })
        builder.addCase(fetchPostComment.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(fetchPostComment.pending, (state) => {
            state = Object.assign(state, {
                loading: true,
            })
        })
        builder.addCase(fetchAuctionComment.rejected, (state, action) => {
            state = Object.assign(state, {
                error: action.error.message || "Unknown error.",
                loading: false,
            })
        })
        builder.addCase(fetchAuctionComment.pending, (state) => {
            state = Object.assign(state, {
                loading: true,
            })
        })

        builder.addCase(logoutAction, (state) => {
            state = { error: "", data: [], loading: false }
        })
    },
})
export const { changeStatusCommentAuction } = commentSlice.actions
export default commentSlice.reducer
