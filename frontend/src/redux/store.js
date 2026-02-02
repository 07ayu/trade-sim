import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./slices/authReducert"

export const store = configureStore({
    reducer: {
        auht: AuthSlice
    }
})