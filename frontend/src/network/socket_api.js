import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_BASE_URL;

// socket.on("connect", () => {
//     console.log("Connected to server");
// });

export const socket = io(URL, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: true,
})

console.log(import.meta.env.VITE_API_BASE_URL)