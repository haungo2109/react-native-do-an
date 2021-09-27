import api from "./apiClient"

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}

const auctionApi = {
    getAuctions: (params) => {
        const url = "/auction/"
        return api.get(url, { params })
    },
    postAuction: (data) => {
        const url = "/auction/"
        return api.post(url, data, config)
    },
    getAuctionOwner: () => {
        const url = "/auction/owner/"
        return api.get(url)
    },
    getAuctionYouJoin: () => {
        const url = "/auction/auction_join/"
        return api.get(url)
    },
    getAuction: (auctionId) => {
        const url = `/auction/${auctionId}/`
        return api.get(url)
    },
    getAuctionComment: (auctionId) => {
        const url = `/auction-comments/${auctionId}/`
        return api.get(url)
    },
    /**
     *Edit auction, user Formdata
     * @param {number} auctionId Id of Auction to update
     * @param {{title: string, content: string, images: File}} data infor update
     * @returns Promise
     */
    patchAuction: (auctionId, data) => {
        const url = `/auction/${auctionId}/`
        return api.patch(url, data, config)
    },
    deleteAuction: (auctionId) => {
        const url = `/auction/${auctionId}/`
        return api.delete(url, config)
    },
    /**
     * Use to change state of auction comment, only th owner have permission
     * @param {number} auctionId
     * @param {number} commentId
     * @param {"in_process"|"success"|"fail"} stateComment
     * @returns Promise
     */
    changeStateAuctionComment: (auctionId, commentId, stateComment) => {
        const url = `/auction/${auctionId}/comment/${commentId}/state/${stateComment}/`
        return api.post(url, null, config)
    },
    /**
     * This use to create auction comment, If you had comment it will be overwrite
     * @param {number} auctionId
     * @param {{content: string, price: number}} data required
     * @returns Promise
     */
    createOrUpdateAuctionComment: (auctionId, data) => {
        const url = `/auction/${auctionId}/comments/`
        return api.post(url, data, config)
    },
    decreateAuctionVote: (auctionId) => {
        const url = `/auction/${auctionId}/decrease-vote/`
        return api.post(url, null, config)
    },
    increateAuctionVote: (auctionId) => {
        const url = `/auction/${auctionId}/increase-vote/`
        return api.post(url, null, config)
    },
    /**
     * This make a auction fail and cant be interact
     * @param {number} auctionId
     * @returns
     */
    setFailAuctionState: (auctionId) => {
        const url = `/auction/${auctionId}/fail-auction/`
        return api.post(url, null, config)
    },
    postMomopay: (data) => {
        const url = "/momopay/"
        return api.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    },
}
export default auctionApi
