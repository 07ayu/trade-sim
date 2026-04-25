import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./slices/authReducer"
import { OrderSlice } from "./slices/orderSlice"

export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        orders: OrderSlice.reducer,
    }
})