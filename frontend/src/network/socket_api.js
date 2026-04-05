import { io } from "socket.io-client";

const URL = "http://localhost:3000";

// socket.on("connect", () => {
//     console.log("Connected to server");
// });

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: true,
})