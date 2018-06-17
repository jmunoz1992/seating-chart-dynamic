import React from 'react'
import { Base64 } from 'js-base64'
import {generatedSeats, SeatingChart} from './index';

export default class StudentView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Base64.extendString();
    const encodedUrl = (window.location.pathname).slice(1);
    const decodedStudents= encodedUrl.fromBase64();
    generatedSeats(decodedStudents, '-');
  }

  render() {
    return (
    <div className="mainContent">
      <h1 id="title">PAIR PROGRAMMING SEATING CHART</h1>
      <h1 id="bathrooms">Bathrooms</h1>
      <SeatingChart />
      <h1 id="teacherDesks">Teachers' Desks</h1>
      <br /><br />
    </div>)
  }
};
