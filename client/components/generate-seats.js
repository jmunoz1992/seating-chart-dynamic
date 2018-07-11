import { SortTrio } from './sort-trio';

/*
  Takes in a string of students and a splitter.
  Splitter can either be by new line or by '-'.

  If there is an odd amount of students,
  students array will run through sortTrio algorithm.

  If there is an even amount of students, students array
  will just be the students splitted by given splitter.

  Algorithm takes each div with id 'group#num'
  and appends a div child with classname 'seat'.
  'seat' class gives the square styling.
  Each 'seat' div has an appended 'p' child
  that contains the student name.
*/
export const GeneratedSeats = (students, splitter) => {
  let studentsToParse = students.split(splitter).filter(student => student !== '');
  let filteredStudents;
  if(studentsToParse.length % 2 === 1) {
    filteredStudents = SortTrio(students, splitter);
  } else {
    filteredStudents = students.split(splitter);
  }
  let index = 1;
  filteredStudents.map(student => {
    if (student !== "") {
      const grabTable = document.getElementById(`group${index}`)
      const makeGrps = document.createElement('div');
      makeGrps.classList.add('seat');
      if (makeGrps.childNodes.length) {
        makeGrps.removeChild(makeGrps.childNodes[0]);
      }
      const nameTag = document.createElement('p');
      const name = document.createTextNode(student.trim());
      nameTag.appendChild(name)
      makeGrps.appendChild(nameTag);
      grabTable.appendChild(makeGrps);
    } else {
      index++;
    }
  });
  return filteredStudents;
}
