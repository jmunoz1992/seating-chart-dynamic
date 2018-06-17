import React from 'react'
import { Base64 } from 'js-base64'
import {GeneratedSeats, SeatingChart} from './index';


/*
  Generates student view layout from the url pathname.
  Url is generated from admin-view.
*/
export default class StudentView extends React.Component {
  componentDidMount() {
    Base64.extendString();
    const encodedUrl = (window.location.pathname).slice(1);
    const decodedStudents= encodedUrl.fromBase64();
    GeneratedSeats(decodedStudents, '-');
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
