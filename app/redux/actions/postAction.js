import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/apiClient"
import postApi from "../../api/postApi"

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
export const getMyPostAction = createAsyncThunk(
    "post/fetchMyPost",
    async () => {
        const response = await postApi.getPostOwner()
        return response
    }
)
export const getMoreMyPostAction = createAsyncThunk(
    "post/fetchMoreMyPost",
    async (nextPageUrl) => {
        const response = await api.get(nextPageUrl)
        return response
    }
)
export const updatePostAction = createAsyncThunk(
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

export const likePostAction = createAsyncThunk("post/like", async (postId) => {
    const response = await postApi.increatePostVote(postId)
    return response
})

export const dislikePostAction = createAsyncThunk(
    "post/dislike",
    async (postId) => {
        const response = await postApi.decreatePostVote(postId)
        return response
    }
)
