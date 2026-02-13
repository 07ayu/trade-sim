import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // your backend port

function SocketTest() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("pong", (data) => {
      console.log("Received:", data);
    });

    socket.emit("ping", "Hello from frontend");

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return <div>Socket Test Running</div>;
}

export default SocketTest;
