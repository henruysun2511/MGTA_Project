import { get } from "../utils/request";

export const getAllSkills = async () => {
    const result = await get('skills');
    return result; 
}