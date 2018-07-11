export const SortTrio = (students, splitter) => {
  let newStudents = students.split(splitter);
  let filteredStudents = [];
  let index = 0;
  let count = 0;
  console.log('new students in sort trio ', newStudents)

  newStudents.forEach(student => {
    index++;
    if (student !== "") {
      count++;
    } else {
      console.log('count ', count);
      if (count === 3 ) {
        let beforeTrio = newStudents.slice(0, index - 4);
        let afterTrio = newStudents.slice(index);
        let trioMoved = newStudents.slice(index - 4, index);
        filteredStudents = [...trioMoved, ...beforeTrio, ...afterTrio];
      }
      count = 0;
    }
  });
  if(checkIfLastTrio(newStudents)) {
    const endingIndex = newStudents.length - 3
    let beforeTrio = newStudents.slice(0, endingIndex);
    let theTrio = newStudents.slice(endingIndex);
    filteredStudents = [...beforeTrio, ...theTrio];
  }
  filteredStudents = filteredStudents.map(student => student.trim());
  return filteredStudents;
}

function checkIfLastTrio(students) {
  let count = 0;
  for(let i = students.length - 4; i < students.length; i++) {
    if(students[i] !== "") {
      count++;
    }
  }
  return count === 3;
}
