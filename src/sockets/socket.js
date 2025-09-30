import { io } from "socket.io-client";

const token = localStorage.getItem("accessToken");

const socket = io("http://localhost:4000", {
  auth: { token },
});

export default socket;