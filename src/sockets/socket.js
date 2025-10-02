import { io } from "socket.io-client";

const token = localStorage.getItem("accessToken");

const socket = io("http://localhost:4000", {
  auth: { token },
  transports: ["websocket"],
});

// socket.on("connect", () => {
//   console.log("✅ Socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.error("❌ Socket connection error:", err.message);
// });

export default socket;