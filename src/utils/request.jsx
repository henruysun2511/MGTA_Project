//Định nghĩa các phương thức lên server
const API_DOMAIN = "http://localhost:3001/";

//Phương thức lấy
export const get = async (path) => {
    const response = await fetch(API_DOMAIN + path);
    const result = await response.json();
    return result;
}

//Phương thức thêm 
export const post = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
}

//Phương thức sửa
export const patch = async (path, options) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
}

//Phương thức xóa
export const del = async (path) => {
    const response = await fetch(API_DOMAIN + path, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
}
