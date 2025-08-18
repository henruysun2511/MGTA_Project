import { del, get, patch, post } from "../utils/request";

const path = "deadlines";

export const getAllDeadlines= async () => {
    const result = await get(path);
    return result;
}

export const createDeadline= async (options) => {
    const result = await post(path, options);
    return result;
}

export const deleteDeadline = async (id) => {
    const result = await del(`${path}/${id}`);
    return result;
};

export const editDeadline = async (id, options) => {
    const result = await patch(`${path}/${id}`, options);
    return result;
};