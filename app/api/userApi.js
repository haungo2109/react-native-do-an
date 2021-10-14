import { getData } from "../utils/AsyncStorage"
import api, { client_id, client_secret } from "./apiClient"

const config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
}

const userApi = {
    /**
     * use to get token
     * @param {{username:"", password: ""}} data is an object
     * @returns Promise
     */
    login: (data) => {
        const url = "/o/token/"
        return api.post(url, data, config)
    },
    logout: async () => {
        const url = "/o/revoke-token/"
        let formData = new FormData()
        formData.append("token", auth)
        formData.append("client_id", client_id)
        formData.append("client_secret", client_secret)
        const auth = await getData("Authorization")
        return api.post(url, formData, config)
    },
    register: (data) => {
        const url = "/user/"
        return api.post(url, data, config)
    },
    loginByGG: (data) => {
        const url = "/user/login-by-gg/"
        return api.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    },
    loginByFB: (data) => {
        const url = "/user/login-by-facebook/"
        return api.post(url, data, config)
    },
    getUserInfo: (id) => {
        const url = `/user/${id}/base-info/`
        return api.get(url)
    },
    getCurrentUserInfo: () => {
        const url = `/user/current-user/`
        return api.get(url)
    },
    updateCurrentUserInfo: (id, data) => {
        const url = `/user/${id}/`
        return api.patch(url, data)
    },
    pushTokenUser: (data) => {
        const url = `/user/push-token/`
        return api.post(url, data)
    },
    deleteTokenUser: () => {
        const url = `/user/delete-token/`
        return api.post(url)
    },
}
export default userApi
