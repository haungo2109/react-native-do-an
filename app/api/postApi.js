import api from "./apiClient"

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}

const postApi = {
    getPosts: (params) => {
        const url = "/post/"
        return api.get(url, { params })
    },
    getPostOfUser: (uid) => {
        const url = "/post/"
        return api.get(url, { params: { id: uid } })
    },
    postPost: (data) => {
        const url = "/post/"
        return api.post(url, data, config)
    },
    getPostOwner: () => {
        const url = "/post/owner/"
        return api.get(url)
    },
    getPost: (postId) => {
        const url = `/post/${postId}/`
        return api.get(url)
    },
    getPostComment: (postId) => {
        const url = `/post-comments/${postId}/`
        return api.get(url)
    },
    /**
     *Edit post, user Formdata
     * @param {number} postId Id of Post to update
     * @param {{content: string, images: File, hashtag: string}}
     * you can use some field data to update, if it has one more hashtag, use ',' to separating
     * @returns Promise
     */
    patchPost: (postId, data) => {
        const url = `/post/${postId}/`
        return api.patch(url, data, config)
    },
    deletePost: (postId) => {
        const url = `/post/${postId}/`
        return api.delete(url, config)
    },
    /**
     * This use to create post comment, If you had comment it will be overwrite
     * @param {number} postId
     * @param {{content: string,}} data required
     * @returns Promise
     */
    createPostComment: (postId, data) => {
        const url = `/post/${postId}/comments/`
        return api.post(url, data, config)
    },
    decreatePostVote: (postId) => {
        const url = `/post/${postId}/decrease-vote/`
        return api.post(url, null, config)
    },
    increatePostVote: (postId) => {
        const url = `/post/${postId}/increase-vote/`
        return api.post(url, null, config)
    },
}
export default postApi
