import { alertWarning } from "./alerts";

const API_DOMAIN = "http://localhost:4000/api/v1/";

const getToken = () => localStorage.getItem("accessToken");
const setToken = (accessToken) => localStorage.setItem("accessToken", accessToken);

// Refresh token
const refreshToken = async () => {
  const res = await fetch(API_DOMAIN + "auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  console.log("refresh status:", res.status);
  const data = await res.json().catch(() => null);
  console.log("refresh response:", data);

  if (!res.ok) throw new Error("Refresh token failed");

  console.log(data.data.accessToken);
  localStorage.setItem("accessToken", data.data.accessToken);
  return data.data.accessToken;
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
  console.log(response);

  // Nếu chưa đăng nhập (không có token) -> 0 refresh
  if (!token && response.status === 401) {
    return response.json();
  }

  // Nếu accessToken hết hạn -> refresh
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

  return response.json();
};
export const get = (path) => request(path, { method: "GET" });
export const post = (path, body) => request(path, { method: "POST", body: JSON.stringify(body) });
export const postFormData = (path, formData) => request(path, { method: "POST", body: formData });
export const patch = (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) });
export const del = (path) => request(path, { method: "DELETE" });
