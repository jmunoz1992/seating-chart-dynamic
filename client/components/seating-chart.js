import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SeatingChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: '',
    }
  }

  sortTrio = (students) => {
    let newStudents = students.split('\n');
    let filteredStudents = [];
    let index = 0;
    let count = 0;
    let studentGrp = [];

    newStudents.forEach(student => {
      index++;
      if (student !== "") {
        count++;
        studentGrp.push(student);
      } else {
        if (count === 3) {
          let beforeTrio = newStudents.slice(0, index - 4);
          let afterTrio = newStudents.slice(index);
          let trioMoved = newStudents.slice(index - 4, index);
          filteredStudents = [...trioMoved, ...beforeTrio, ...afterTrio];
        }
        studentGrp = [];
        count = 0;
      }
    });
    return filteredStudents;
  }

  generateStudentSeats= () => {
    const students =
      `Michael Bush
      Nick Bohannan

      Diego Andres Hernandorena
      Kevin Lim

      Jerry Wu
      Matthew Noesen

      Jan Gierlach
      Patrick Kilgore

      Bradley Schwartz
      Jessica Smith

      Jacoby Kang
      Raymond Chao

      Brandon Yee
      Chris Lusk
      Jehoshuah Knapp

      Matt Ehlinger
      Richard Hui

      Evelyn LaTour
      Hollie Lambert

      Brad Smith
      Eliot Davis

      Jeff Hauser
      Kayleen Offringa

      Brendan Meyer
      Zohaib Farooqi`;

    let filteredStudents = this.sortTrio(students);
    let index = 1;
    filteredStudents.map(student => {
      if (student !== "") {
        const getTable = document.getElementById(`seat${index}`);
        const nameTag = document.createElement('p');
        const name = document.createTextNode(student.trim());
        nameTag.appendChild(name);
        getTable.appendChild(nameTag);
        index++;
      }
    });
  }

  handleChange = (event) => {
    const students = event.target.value;
    this.setState({students});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('event in handle submit ', event.target.value);
  }

  render() {
    const {students} = this.state;
    return (
    <div className="mainContent">
      <h1 id="title">PAIR PROGRAMMING SEATING CHART</h1>
      <h1 id="bathrooms">Bathrooms</h1>
      <div className="tables">
        <div className="table">
          <div className="trio">
              <div className="seat" id="seat1"></div>
              <div className="seat" id="seat2"></div>
              <div className="seat" id="seat3"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat4"></div>
              <div className="seat" id="seat5"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat6"></div>
              <div className="seat" id="seat7"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat8"></div>
              <div className="seat" id="seat9"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat10"></div>
              <div className="seat" id="seat11"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat12"></div>
              <div className="seat" id="seat13"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat14"></div>
              <div className="seat" id="seat15"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat16"></div>
              <div className="seat" id="seat17"></div>
          </div>
        </div>
        <div className="table">
          <div className="quad">
              <div className="seat" id="seat18"></div>
              <div className="seat" id="seat19"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat20"></div>
              <div className="seat" id="seat21"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat22"></div>
              <div className="seat" id="seat23"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat24"></div>
              <div className="seat" id="seat25"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat26"></div>
              <div className="seat" id="seat27"></div>
          </div>
          <div className="quad">
              <div className="seat" id="seat28"></div>
              <div className="seat" id="seat29"></div>
          </div>
        </div>
      </div>
      <h1 id="teacherDesks">Teacher Desks</h1>
      <form onSubmit={(event) => { this.handleSubmit(event) }} >
        <input onChange={(evt) => this.handleChange(evt)} value={students}/>
        <button id="randomize-btn" onClick={this.generateStudentSeats}>Generate Seats!</button>
      </form>
    </div>)
  }
};

/**
 * CONTAINER
 */
const mapState = ({}) => ({});

const mapDispatch = () => {
  return {};
};

export default connect(mapState, mapDispatch)(SeatingChart)
