import React from 'react'
import {connect} from 'react-redux'
import { Form, TextArea } from 'semantic-ui-react'
import { Base64 } from 'js-base64'
import copy from 'copy-to-clipboard';
import {generatedSeats, SeatingChart} from './index';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: '',
      encodedUrl: '',
    }
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
    const seatsGenerated = generatedSeats(this.state.students, '\n');
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
      <h1 id="title">PAIR PROGRAMMING SEATING CHART</h1>
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
