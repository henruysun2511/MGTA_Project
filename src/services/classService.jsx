import { get } from "../utils/request";

export const getAllClasses = async () => {
    const result = await get("classes");
    return result;
}



