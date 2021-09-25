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
    logout: () => {
        const url = "/o/revoke-token/"
        return api.post(
            url,
            {
                token: localStorage.getItem("Authorization"),
                client_id: client_id,
                client_secret: client_secret,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
    },
    register: (data) => {
        const url = "/user/"
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
        return api.push(url, data)
    },
}
export default userApi
