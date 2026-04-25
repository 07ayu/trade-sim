import { createSlice } from "@reduxjs/toolkit";

const initial = {
    orders: [],
    loading: false,
    error: null,
}


export const OrderSlice = createSlice({
    name: "order",
    initialState: initial,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setOrderCount: (state, action) => {
            state.orderCount = action.payload
        }
    }
})

export const { setOrders, setLoading, setError, setOrderCount } = OrderSlice.actions


