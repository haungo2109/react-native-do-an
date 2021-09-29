import { createSlice } from "@reduxjs/toolkit"
import { logoutAction } from "../actions"

const initState = {
    pushToken: "",
    data: [
        {
            title: "Chào mừng bạn đã đến với Kanj",
            body: "Hãy cùng chúng mình giới thiệu App nhé",
            obj: "introduction",
            id: 0,
            isSeen: false,
        },
    ],
}
const notificationSlice = createSlice({
    name: "notification",
    initialState: initState,
    reducers: {
        setPushToken: (state, action) => {
            let pushToken = action.payload
            state = Object.assign(state, { ...state, pushToken })
        },
        setSeenAll: (state, action) => {
            let data = state.data.map((c) => ({ ...c, isSeen: true }))
            state = Object.assign(state, { ...state, data })
        },
        addNotification: (state, action) => {
            let data = [action.payload, ...state.data]
            state = Object.assign(state, { ...state, data })
        },
        removeANotification: (state, action) => {
            const id = action.payload
            let data = state.data.map((c) =>
                c.id === id ? { ...c, isSeen: true } : c
            )
            state = Object.assign(state, { ...state, data })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutAction, (state) => {
            state = initState
        })
    },
})

export const {
    setSeenAll,
    addNotification,
    removeANotification,
    setPushToken,
} = notificationSlice.actions

export default notificationSlice.reducer
