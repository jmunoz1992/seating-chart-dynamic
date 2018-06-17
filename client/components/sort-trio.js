export const sortTrio = (students, splitter) => {
  let newStudents = students.split(splitter);
  let filteredStudents = [];
  let index = 0;
  let count = 0;

  newStudents.forEach(student => {
    index++;
    if (student !== "") {
      count++;
    } else {
      if (count === 3) {
        let beforeTrio = newStudents.slice(0, index - 4);
        let afterTrio = newStudents.slice(index);
        let trioMoved = newStudents.slice(index - 4, index);
        filteredStudents = [...trioMoved, ...beforeTrio, ...afterTrio];
      }
      count = 0;
    }
  });
  filteredStudents = filteredStudents.map(student => student.trim());
  return filteredStudents;
}
