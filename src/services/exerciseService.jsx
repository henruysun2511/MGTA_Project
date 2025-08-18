import { del, get, patch, post } from "../utils/request";

export const getAllExercises = async () => {
    const result = await get("exercises");
    return result;
}

export const getExerciseById = async (id) => {
    const result = await get(`exercises?id=${id}`);
    return result;
}

export const createExercise = async (options) => {
    const result = await post("exercises", options);
    return result;
}

export const deleteExercise = async (id) => {
    const result = await del(`exercises/${id}`);
    return result;
};

export const editExercise = async (id, options) => {
    const result = await patch(`exercises/${id}`, options);
    return result;
};