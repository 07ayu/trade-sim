import { Logout } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },

        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { loginStart, loginSuccess, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectCurrentUser= (state) => state.auth.user
export const selectCurrentToken= (state) => state.auth.token