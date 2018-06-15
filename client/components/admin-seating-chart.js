import React from 'react'
import {connect} from 'react-redux'
import { Form, TextArea } from 'semantic-ui-react'
import {addStudents} from "../store"
import { Base64 } from 'js-base64'
import {Link} from 'react-router-dom';

import { BitlyClient } from 'bitly';

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

  condenseUrl = (encodedUrl) => {
    let bitly = new BitlyClient('425de7bacec374ff0783b97816829f68b25c25b2', {});

    bitly
    .shorten(encodedUrl)
    .then(function(result) {
      console.log(result);
      return result;
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  generateStudentSeats= () => {
    // let newStudents = this.state.students.split('\n');
    // console.log('students length ', newStudents.length);
    // const isOddAmtStudents = newStudents.length % 2 === 0;
    // let filteredStudentss = isOddAmtStudents ? this.sortTrio(this.state.students) : newStudents;

    let filteredStudents = this.sortTrio(this.state.students);

    const baseEncode = Base64.encodeURI(filteredStudents.join('-'));
    const isTherePort = window.location.port.length ? `:${window.location.port}` : '';
    const encodedUrl =
      window.location.protocol + '//' +
      window.location.hostname +
      isTherePort + '/' + baseEncode;

    const condensedUrl = this.condenseUrl(encodedUrl);
    console.log('condensed url ', condensedUrl);

    this.setState({encodedUrl: condensedUrl});
    let index = 1;
    filteredStudents.map(student => {
      if (student !== "") {
        const getTable = document.getElementById(`seat${index}`);
        const nameTag = document.createElement('p');
        const name = document.createTextNode(student.trim());
        const another = document.createTextNode('\n');
        nameTag.appendChild(name)
        nameTag.appendChild(another);
        getTable.appendChild(nameTag);
        index++;
      }
    });
  }

  handleChange = (event) => {
    const students = event.target.value;
    this.setState({students});
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
        {
          user.isAdmin ?
          <div className="table">
              <h1>Paste Pairs In Box</h1>
              <Form>
                <TextArea placeholder='Insert Students Pairs Here' onChange={(evt) => this.handleChange(evt)} />
              </Form>
              <button id="randomize-btn" onClick={this.generateStudentSeats}>Generate Seats!</button>
              {
                encodedUrl.length ?
                <div>
                  <p>Slack this link: {encodedUrl}</p>
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
