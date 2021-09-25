import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import paymentMethodApi from "../../api/paymentMethodApi"

export const getPaymentMethodAction = createAsyncThunk(
    "paymentMethod/getALl",
    async () => {
        const response = await paymentMethodApi.getPaymentMethod()
        return response
    }
)

const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(getPaymentMethodAction.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload.results)
        })
    },
})

export default paymentMethodSlice.reducer
