const ADD_STUDENTS = 'ADD_STUDENTS';

export const addStudents = function (students) {
  return {
    type: ADD_STUDENTS,
    students
  };
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
