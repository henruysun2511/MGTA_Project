import { get, post } from "../utils/request";

export const login = async (username, password) => {
    const result = await get(`accounts?username=${username}&password=${password}`);
    return result;
}

// export const login = async (username, password) => {
//     const result = await post("api/v1/auth/login", {username: username, password: password});
//     return result;
// }

export const register = async (options) => {
    const result = await post(`accounts`, options);
    return result;
}

export const checkExistAcount = async(key,value) => {
    const result = await get(`accounts?${key}=${value}`);
    return result;
}

export const createUser = async (options) => {
    const result = await post(`users`, options);
    return result;
}