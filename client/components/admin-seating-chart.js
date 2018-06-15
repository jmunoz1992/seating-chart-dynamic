import React from 'react'
import {connect} from 'react-redux'
import { Form, TextArea } from 'semantic-ui-react'
import {addStudents} from "../store"
import { Base64 } from 'js-base64'
import copy from 'copy-to-clipboard';
import {Link} from 'react-router-dom';

class AdminSeatingChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: '',
      encodedUrl: '',
    }
  }

  sortTrio = (students) => {
    let newStudents = students.split('\n');
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

  encodeUrl = (filteredStudents) => {
    const baseEncode = Base64.encodeURI(filteredStudents.join('-'));
    const isTherePort = window.location.port.length ? `:${window.location.port}` : '';
    const encodedUrl =
      window.location.protocol + '//' +
      window.location.hostname +
      isTherePort + '/' + baseEncode;

    this.setState({encodedUrl});
  }

  generateStudentSeats= () => {
    let students = this.state.students.split('\n').filter(student => student !== '');

    let filteredStudents = [];

    if(students.length % 2 === 1) {
      filteredStudents = this.sortTrio(this.state.students);
    } else {
      filteredStudents = this.state.students.split('\n');
    }

    this.encodeUrl(filteredStudents);

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

  handleChange = (event) => {
    const students = event.target.value;
    this.setState({students});
  }

  copyGenSeatsLink = () => {
    const urlToCopy = this.state.encodedUrl;
    copy(urlToCopy, {
      debug: true,
      message: 'Press this button to copy',
    });
  }

  render() {
    const {user} = this.props;
    const {encodedUrl} = this.state;
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
        {
          user.isAdmin ?
          <div className="table">
              <h1>Paste Pairs In Box</h1>
              <Form>
                <TextArea placeholder='Insert Students Pairs Here' onChange={(evt) => this.handleChange(evt)} />
              </Form>
              <button id="generate-btn" onClick={this.generateStudentSeats}>Generate Seats!</button>
              {
                encodedUrl.length ?
                <div>
                  <button id="copy-link" onClick={this.copyGenSeatsLink}>Copy Link</button>
                </div>
                : null
              }
          </div> : null
        }
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    addStudentPairs(students) {
      dispatch(addStudents(students));
    }
  };
};

export default connect(mapState, mapDispatch)(AdminSeatingChart)
