import { createSlice } from "@reduxjs/toolkit"

const initState = {
    // language: "vi",
    theme: "light",
}

const settingSlice = createSlice({
    name: "setting",
    initialState: initState,
    reducers: {
        setLanguage(state, action) {
            state = Object.assign(state, { ...state, language: action.payload })
        },
        setTheme(state, action) {
            state = Object.assign(state, { ...state, theme: action.payload })
        },
    },
})

export const { setLanguage, setTheme } = settingSlice.actions
export default settingSlice.reducer
