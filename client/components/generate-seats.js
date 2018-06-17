import {sortTrio} from './index';

export const generatedSeats = (students, splitter) => {
  let studentsToParse = students.split(splitter).filter(student => student !== '');

  let filteredStudents = [];

  if(studentsToParse.length % 2 === 1) {
    filteredStudents = sortTrio(students, splitter);
  } else {
    filteredStudents = students.split(splitter);
  }
  let index = 1;
  filteredStudents.map(student => {
    if (student !== "") {
      const grabTable = document.getElementById(`quad${index}`)
      const makeGrps = document.createElement('div');
      makeGrps.classList.add('seat');
      if (makeGrps.childNodes.length) {
        makeGrps.removeChild(makeGrps.childNodes[0]);
      }
      const nameTag = document.createElement('p');
      const name = document.createTextNode(student.trim());
      const another = document.createTextNode('\n');
      nameTag.appendChild(name)
      nameTag.appendChild(another);
      makeGrps.appendChild(nameTag);
      grabTable.appendChild(makeGrps);
    } else {
      index++;
    }
  });
  return filteredStudents;
}
