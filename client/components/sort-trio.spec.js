/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {sortTrio} from './index'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('sort trio algorithm', () => {
  let filteredStudents;
  let students = `
    Mickey Mouse
    Donald Duck

    Fry
    Professor Farnsworth
    Leela

    Gunther
    Finn
  `

  beforeEach(() => {
    filteredStudents = sortTrio(students, '\n')
  })

  it('returns an array of of all the students', () => {
    expect(filteredStudents).to.be.an('array');
    expect(filteredStudents.length).to.equal(11)
  })

  it('reorganizes array of people and returns first trio', () => {
    let firstThree = filteredStudents.slice(0, 3);
    expect(firstThree[0]).to.equal('Fry');
    expect(firstThree[1]).to.equal('Professor Farnsworth');
    expect(firstThree[2]).to.equal('Leela');
  })
})
