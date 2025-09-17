import { del, get, patch, post, postFormData } from "../utils/request";

export const getAllData = async (path) => {
    const result = await get(path);
    return result;
}

export const getData = async (path, queryString) => {
  const result = await get(`${path}?${queryString}`);
  console.log("Fetch URL:", `${path}?${queryString}`);
  return result;
};


export const createData = async (path,options) => {
    const result = await post(path, options);
    return result;
}

export const createImageData = async (path,options) => {
    const result = await postFormData(path, options);
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