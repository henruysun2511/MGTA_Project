import { connectSocket } from "../sockets/socket";
import { alertWarning } from "./alerts";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

const getToken = () => localStorage.getItem("accessToken");
const setToken = (accessToken) => localStorage.setItem("accessToken", accessToken);

// Biến toàn cục để tránh refresh nhiều lần
let refreshPromise = null;

// Refresh token
const refreshToken = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(API_DOMAIN + "auth/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.data?.accessToken) {
        throw new Error("Refresh token failed");
      }

      setToken(data.data.accessToken);
      connectSocket();
      return data.data.accessToken;
    })()
      .catch((err) => {
        // reset nếu lỗi để lần sau còn gọi lại
        refreshPromise = null;
        throw err;
      })
      .then((token) => {
        refreshPromise = null; 
        return token;
      });
  }
  return refreshPromise;
};

// Request chung
const request = async (path, options = {}) => {
  let token = getToken();
  const isFormData = options.body instanceof FormData;

  let response = await fetch(API_DOMAIN + path, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: "include",
  });

  // Nếu chưa đăng nhập
  if (!token && response.status === 401) {
    return response.json().catch(() => ({}));
  }

  // Nếu accessToken hết hạn
  if (response.status === 401 && token) {
    try {
      token = await refreshToken(); 
      response = await fetch(API_DOMAIN + path, {
        ...options,
        headers: {
          Accept: "application/json",
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
        credentials: "include",
      });
      console.log("refresh token success");
    } catch (err) {
      console.error("Refresh token failed:", err);
      localStorage.clear();
      const alert = await alertWarning(
        "Phiên đăng nhập đã hết hạn",
        "Vui lòng đăng nhập lại để tiếp tục"
      );
      if (alert.isConfirmed) {
        window.location.replace("/auth/login");
      }
      throw err;
    }
  }

  return response.json().catch(() => ({}));
};

export const get = (path) => request(path, { method: "GET" });
export const post = (path, body) =>
  request(path, { method: "POST", body: JSON.stringify(body) });
export const postFormData = (path, formData) =>
  request(path, { method: "POST", body: formData });
export const patch = (path, body) =>
  request(path, { method: "PATCH", body: JSON.stringify(body) });
export const del = (path) => request(path, { method: "DELETE" });

