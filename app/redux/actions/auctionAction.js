import { createAsyncThunk } from "@reduxjs/toolkit"
import auctionApi from "../../api/auctionApi"
import { changeStatusCommentAuction } from "../reducers/commentReducer"

export const getAllAuctionAction = createAsyncThunk(
    "auction/fetchAllAuction",
    async (params) => {
        const response = await auctionApi.getAuctions(params)
        return response
    }
)
export const getMoreAuctionAction = createAsyncThunk(
    "auction/fetchMoreAuction",
    async (nextPageUrl) => {
        const response = await auctionApi.getNextPageAuction(nextPageUrl)
        return response
    }
)
export const getMoreMyAuctionAction = createAsyncThunk(
    "auction/fetchMoreMyAuction",
    async (nextPageUrl) => {
        const response = await auctionApi.getNextPageAuction(nextPageUrl)
        return response
    }
)
export const getMoreJoinAuctionAction = createAsyncThunk(
    "auction/fetchMoreJoinAuction",
    async (nextPageUrl) => {
        const response = await auctionApi.getNextPageAuction(nextPageUrl)
        return response
    }
)
export const getOneAuctionAction = createAsyncThunk(
    "auction/fetchOneAuction",
    async (id) => {
        const response = await auctionApi.getAuction(id)
        return response
    }
)
export const postMomoPayAction = createAsyncThunk(
    "auction/postMomoPay",
    async (data, thunkAPI) => {
        const response = await auctionApi.postMomopay(data)
        thunkAPI.dispatch(changeStatusCommentAuction(response))
        return response
    }
)
export const getMyAuction = createAsyncThunk(
    "auction/fetchMyAuction",
    async () => {
        const response = await auctionApi.getAuctionOwner()
        return response
    }
)
export const getAuctionYouJoin = createAsyncThunk(
    "auction/fetchAuctionYouJoin",
    async () => {
        const response = await auctionApi.getAuctionYouJoin()
        return response
    }
)
export const updateAuction = createAsyncThunk(
    "auction/updateAuction",
    async ({ id, data }) => {
        const response = await auctionApi.patchAuction(id, data)
        return response
    }
)
export const setFailAuctionAction = createAsyncThunk(
    "auction/setFailAuctionAction",
    async (id) => {
        const response = await auctionApi.setFailAuctionState(id)
        return response
    }
)
export const changeStatusAuctionComment = createAsyncThunk(
    "auction/changeStatusAuctionComment",
    async ({ auctionId, commentId, statusComment }, thunkAPI) => {
        const response = await auctionApi.changeStateAuctionComment(
            auctionId,
            commentId,
            statusComment
        )
        thunkAPI.dispatch(changeStatusCommentAuction(response))
        return response
    }
)
export const postAuctionAction = createAsyncThunk(
    "auction/postAuction",
    async (data) => {
        const response = await auctionApi.postAuction(data)
        return response
    }
)
export const deleteAuctionAction = createAsyncThunk(
    "auction/deleteAuction",
    async (id) => {
        const response = await auctionApi.deleteAuction(id)
        return response
    }
)

export const likeAuction = createAsyncThunk(
    "auction/like",
    async (auctionId) => {
        const response = await auctionApi.increateAuctionVote(auctionId)
        return response
    }
)

export const dislikeAuction = createAsyncThunk(
    "auction/dislike",
    async (auctionId) => {
        const response = await auctionApi.decreateAuctionVote(auctionId)
        return response
    }
)
