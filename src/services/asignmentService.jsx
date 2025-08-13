import { del, get, patch, post } from "../utils/request";

export const getAllAsignment = async () => {
    const result = await get("assignments");
    return result;
}

export const createAssignment = async (options) => {
    const result = await post("assignments", options);
    return result;
}

export const deleteAssignment = async (id) => {
    const result = await del(`assignments/${id}`);
    return result;
};

export const editAsignment = async (id, options) => {
    const result = await patch(`assignments/${id}`, options);
    return result;
};