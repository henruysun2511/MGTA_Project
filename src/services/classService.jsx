import { get } from "../utils/request";

export const getAllClass = async () => {
    const result = await get("classes");
    return result;
}



