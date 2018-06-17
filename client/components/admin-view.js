import React from 'react'
import {connect} from 'react-redux'
import { Form, TextArea } from 'semantic-ui-react'
import { Base64 } from 'js-base64'
import copy from 'copy-to-clipboard';
import {GeneratedSeats, SeatingChart} from './index';


/*
  Creates an admin view of the current class seating chart layout.
  Has an input box to paste in string of students.
  Each group (pair or trio of students) must be seperated by a new line.
  Generated seats algorithm takes string of students and generates
  new layout of seats for each group and a copyable link button
  to slack student view layout.
*/
class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: '',
      encodedUrl: '',
    }
  }

  /*
    Takes array of filtered students and converts to base 64 code.
    Base 64 coded string is attached to the pathname of the url.
    Encoded url is the copyable url to the student view layout.
  */
  encodeUrl = (filteredStudents) => {
    const baseEncode = Base64.encodeURI(filteredStudents.join('-'));
    const isTherePort = window.location.port.length ? `:${window.location.port}` : '';
    const encodedUrl =
      window.location.protocol + '//' +
      window.location.hostname +
      isTherePort + '/' + baseEncode;
    this.setState({encodedUrl});
  }

  /*
    Runs a seats generator algorithm that takes the pasted students
    from the input box and generates seats for each group (pair and/or trio)
    as well as an encoded url to slack a student view layout.
  */
  generateStudentSeats= () => {
    const seatsGenerated = GeneratedSeats(this.state.students, '\n');
    this.encodeUrl(seatsGenerated);
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
      <h1 id="title">PAIR PROGRAMMING SEATING CHART ADMIN VIEW</h1>
      <h1 id="bathrooms">Bathrooms</h1>
      <div className="tables">
        <SeatingChart />
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
                  <button id="copy-link" onClick={copy(this.state.encodedUrl)}>Copy Link</button>
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
const mapState = ({user}) => ({user});

export default connect(mapState, null)(AdminView)
