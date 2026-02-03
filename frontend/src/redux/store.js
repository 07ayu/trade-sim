import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./slices/authReducer"

export const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
})