import React from 'react'
import {connect} from 'react-redux'
import { Base64 } from 'js-base64'

class StudentSeatingChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Base64.extendString();
    const encodedUrl = (window.location.pathname).slice(1);
    const decodedStudents= encodedUrl.fromBase64();
    this.generateStudentSeats(decodedStudents);
  }

  sortTrio = (students) => {
    let newStudents = students.split('-');
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
    return filteredStudents;
  }

  generateStudentSeats = (studentsDecoded) => {
    const students = studentsDecoded.split('-').filter(student => student !== '');

    let filteredStudents = [];

    if(students.length % 2 === 1) {
      filteredStudents = this.sortTrio(studentsDecoded);
    } else {
      filteredStudents = studentsDecoded.split('-');
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
  }

  render() {
    return (
    <div className="mainContent">
      <h1 id="title">PAIR PROGRAMMING SEATING CHART</h1>
      <h1 id="bathrooms">Bathrooms</h1>
      <div className="tables">
        <div className="table">
          <div className="quad" id="quad1" />
          <div className="quad" id="quad2" />
          <div className="quad" id="quad3" />
          <div className="quad" id="quad4" />
          <div className="quad" id="quad5" />
          <div className="quad" id="quad6" />
          <div className="quad" id="quad7" />
          <div className="quad" id="quad8" />
        </div>
        <div className="table">
          <div className="quad" id="quad9" />
          <div className="quad" id="quad10" />
          <div className="quad" id="quad11" />
          <div className="quad" id="quad12" />
          <div className="quad" id="quad13" />
          <div className="quad" id="quad14" />
        </div>
      </div>
      <h1 id="teacherDesks">Teachers' Desks</h1>
      <br /><br />
    </div>)
  }
};

/**
 * CONTAINER
 */
const mapState = ({user, students}) => ({user, students});

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(StudentSeatingChart)
