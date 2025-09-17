export const fetchAction = (resource, list) => ({
  type: `${resource}/FETCH`,
  payload: list
});

export const fetchById = (resource, data) => ({
  type: `${resource}/FETCH_BY_ID`,
  payload: data,
});

export const createAction = (resource, data) => ({
  type: `${resource}/CREATE`,
  payload: data
});

export const updateAction = (resource, data) => ({
  type: `${resource}/UPDATE`,
  payload: data
});

export const deleteAction = (resource, id) => ({
  type: `${resource}/DELETE`,
  payload: id
});


export const softDeleteAction = (resource, id) => ({
  type: `${resource}/SOFT_DELETE`,
  payload: id
});

export const recycleAction = (resource, id) => ({
  type: `${resource}/RECYCLE`,
  payload: id
});
