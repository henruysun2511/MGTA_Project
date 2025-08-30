import { del, get, patch, post } from "../utils/request";

export const getAllData = async (path) => {
    const result = await get(path);
    return result;
}

export const getDataById = async (path, id) => {
    const result = await get(`${path}?id=${id}`);
    return result;
}

export const getDataBySpecificId = async (path, key, id) => {
    const result = await get(`${path}?${key}=${id}`);
    return result;
}

export const createData = async (path,options) => {
    const result = await post(path, options);
    return result;
}

export const deleteData = async (path, id) => {
    const result = await del(`${path}/${id}`);
    return result;
};

export const updateData = async (path, id, options) => {
    const result = await patch(`${path}/${id}`, options);
    return result;
};