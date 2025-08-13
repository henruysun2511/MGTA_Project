export const fetchAssignments = (list) => ({
  type: "FETCH_ASSIGNMENTS",
  payload: list
});

export const createAssignmentAction = (data) => ({
  type: "CREATE_ASSIGNMENT",
  payload: data
});

export const updateAssignmentAction = (data) => ({
  type: "UPDATE_ASSIGNMENT",
  payload: data
});

export const deleteAssignmentAction = (id) => ({
  type: "DELETE_ASSIGNMENT",
  payload: id
});

export const softDeleteAssignmentAction = (id) => ({
  type: "SOFT_DELETE_ASSIGNMENT",
  payload: id
});

export const recycleAssignmentAction = (id) => ({
  type: "RECYCLE_ASSIGNMENT",
  payload: id
});