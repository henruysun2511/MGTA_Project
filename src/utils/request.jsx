//Định nghĩa các phương thức lên server
// const API_DOMAIN = "http://localhost:3001/";
// const API_DOMAIN = "https://mgta-fake-api.onrender.com/api/";

const API_DOMAIN = "http://localhost:4000/api/v1/";

// Hàm lấy token
const getToken = () => {
  return localStorage.getItem("accessToken");
};

// Phương thức lấy
export const get = async (path) => {
  const token = getToken();
  const response = await fetch(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }) 
    },
    credentials: "include"
  });
  const result = await response.json();
  return result;
};

// Phương thức thêm
export const post = async (path, options) => {
  const token = getToken();
  console.log(API_DOMAIN+path)
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(options),
    credentials: "include"
  });
  const result = await response.json();
  return result;
};

// Phương thức thêm ảnh
export const postFormData = async (path, formData) => {
  const token = getToken();
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: formData,
    credentials: "include"
  });
  return await response.json();
};

// Phương thức sửa
export const patch = async (path, options) => {
  const token = getToken();
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(options),
    credentials: "include"
  });
  const result = await response.json();
  return result;
};

//Phương thức xóa
export const del = async (path) => {
  const token = getToken();
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    credentials: "include"
  });
 
  const result = await response.json();
  return result;
};