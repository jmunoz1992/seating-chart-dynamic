import React from 'react';

/*
  Displays current seating layout in divs.
  'group', 'table', and 'tables' classname refers to styling.
  'group#num' is used in seats algorithm generator.
*/
export const SeatingChart = () => {
  return (
    <div className="tables">
      <div className="table">
        <div className="group" id="group1" />
        <div className="group" id="group2" />
        <div className="group" id="group3" />
        <div className="group" id="group4" />
        <div className="group" id="group5" />
        <div className="group" id="group6" />
        <div className="group" id="group7" />
        <div className="group" id="group8" />
      </div>
      <div className="table">
        <div className="group" id="group9" />
        <div className="group" id="group10" />
        <div className="group" id="group11" />
        <div className="group" id="group12" />
        <div className="group" id="group13" />
        <div className="group" id="group14" />
      </div>
    </div>
  )
}
