import axios from "axios"
import { store } from "../redux/store"
import { logout } from "../redux/slices/authReducer";

const axios_api = axios.create({
    baseURL: "http://localhost:3000",

    withCredentials: true
});

axios_api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status == 401) {
            try {
                const res = await axios.post(
                    "http://localhost:3000/refresh",
                    {},
                    { withCredentials: true }
                );

                store.dispatch(loginSuccess(res.data))
                return axios_api(originalRequest)

            } catch (error) {
                store.dispatch(logout());
                window.location.href = "/login";
            }

            return Promise.reject(error)
        }
    })
export default axios_api; 