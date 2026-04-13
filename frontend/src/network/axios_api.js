import axios from "axios"
import { store } from "../redux/store"
import { logout, setAuth } from "../redux/slices/authReducer";
// import { logout } from "../redux/slices/authReducer";

export const axios_api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    withCredentials: true
});
// export const axios_demoServer = axios.create({
//     baseURL: "http://localhost:3002",

//     withCredentials: true
// });

// axios_api.interceptors.response.use((response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status == 401) {
//             try {
//                 const res = await axios.post(
//                     "http://localhost:3000/auth/refresh",
//                     {},
//                     { withCredentials: true }
//                 );

//                 store.dispatch(setAuth(res.data))
//                 return axios_api(originalRequest)

//             } catch (error) {
//                 store.dispatch(logout());
//                 window.location.href = "/login";
//             }

//             return Promise.reject(error)
//         }
//     })
// export { axios_api, axios_demoServer };

// export default axio