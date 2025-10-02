import { io } from "socket.io-client";


const socket = io("http://localhost:4000", {
  auth: { token: localStorage.getItem("accessToken") },
  transports: ["websocket"],
  autoConnect: false, 
});

export const connectSocket = () => {
  socket.auth = { token: localStorage.getItem("accessToken") }; 
  socket.connect();
};

// socket.on("connect", () => {
//   console.log("✅ Socket connected:", socket.id);
// });

// socket.on("connect_error", (err) => {
//   console.error("❌ Socket connection error:", err.message);
// });

export default socket;