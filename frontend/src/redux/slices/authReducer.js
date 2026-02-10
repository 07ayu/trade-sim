import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    username: null,

    Authenticated: false,
    loading: false,
    error: null,


}

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
            state.error = null
        },
        setAuth: (state, action) => {
            state.email = action.payload.user.email
            state.username = action.payload.user.username
            state.Authenticated = true
            // state.loading = false
        },
        setError: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
        logout: (state) => {
            state.email = null;
            state.Authenticated = false;
            state.loading = false
        }
    }
})

export const { setAuth, setError, setLoading, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentUser = (state) => state.auth.username
export const selectCurrentAuthenticated = (state) => state.auth.Authenticated
export const selectCurrentAuthLoading = (state)=> state.auth.loading