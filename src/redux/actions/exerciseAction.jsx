export const fetchExercises = (list) => ({
  type: "FETCH_EXERCISES",
  payload: list
});

export const createExerciseAction = (data) => ({
  type: "CREATE_EXERCISE",
  payload: data
});

export const updateExerciseAction = (data) => ({
  type: "UPDATE_EXERCISE",
  payload: data
});

export const deleteExerciseAction = (id) => ({
  type: "DELETE_EXERCISE",
  payload: id
});

export const softDeleteExerciseAction = (id) => ({
  type: "SOFT_DELETE_EXERCISE",
  payload: id
});

export const recycleExerciseAction = (id) => ({
  type: "RECYCLE_EXERCISE",
  payload: id
});

export const searchExerciseFilter = (text) => {
    return {
        type: 'SEARCH_EXERCISE_FILTER',
        payload: text
    }
}

export const skillExerciseFilter = (skillArray) => {
    return {
        type: 'SKILL_EXERCISE_FILTER',
        payload: skillArray
    }
}