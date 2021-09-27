const Axios = require("axios")
import { setData, getData } from "../utils/AsyncStorage"
export const baseURL = "http://192.168.1.21:5000"
export const client_id = "TPLrxQE8mF9slRzevZSNbNCLQXDSSbJrnIprMCNM"
export const client_secret =
    "QRHKVKgNnYo8GmwvxUfFtJRAtvtoLTD4mDoNtWzxulgFhrY8rssWssFglvAvZxZpm2vHHBY2nIJDHETm3SOONxD0ADRKL0ald5Ip8hCoUeOAxQn8KipFFjkU64LlzlCQ"

const api = new Axios.create({
    baseURL,
    headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
    },
    // withCredentials: true,
})

const refreshAccessToken = async () => {
    try {
        const refresh_token = await getData("refresh_token")
        const form = new FormData()
        form.append("grant_type", "refresh_token")
        form.append("refresh_token", refresh_token)
        form.append("valid_for", "86400")
        form.append("client_id", client_id)
        form.append("client_secret", client_secret)

        return api.post("/o/token/", form, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
    } catch (e) {
        return Error("Vui lòng đăng nhập lại.")
    }
}

const handleError = (err) => {
    console.log("Handle error response: ", err)
    if (!err?.response && err.status > 2000) return Promise.reject(err.message)
    if (!err?.response) return Promise.reject("Lỗi app form điền bị sai.")

    const { status, data } = err.response

    if (status === 404 && data?.detail)
        return Promise.reject("Đối tượng này đã bị xóa!!!.")
    if (status === 400 && data?.username)
        return Promise.reject("Username này đã đăng ký.")
    if (status === 400 && data?.deadline)
        return Promise.reject("Vui lòng nhập ngày theo YYY-MM-dd hh:mm")
    if (status === 400 && data?.error && data?.error === "invalid_grant")
        return Promise.reject("Thông tin đăng nhập sai.")

    if (err.response.status !== 401) return Promise.reject(err.message)

    const originalConfig = err.config

    if (originalConfig.url !== "/o/token/" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true

            try {
                refreshAccessToken().then(() => {
                    api(originalConfig)
                })
            } catch (_error) {
                return Promise.reject(_error)
            }
        }
    }
    return Promise.reject(err)
}

api.interceptors.request.use(async function (config) {
    const auth = await getData("Authorization")
    if (auth) config.headers["Authorization"] = auth
    return config
}, handleError)

api.interceptors.response.use(async function (res) {
    if (res?.data?.access_token) {
        await setData("Authorization", `Bearer ${res?.data?.access_token}`)
        await setData("refresh_token", res?.data?.refresh_token)
    }
    if (res?.data) {
        return res.data
    }
    if (res.status == 204) return null
    return res
}, handleError)

export default api
