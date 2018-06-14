import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPairs} from '../store'

const Workshop = (props) => {
  console.log('pairs fetched ', props.fetchPairs());
  return (<div>
    <h1>POOPITY SCOOP</h1>
  </div>)
}

/**
 * CONTAINER
 */
const mapState = ({}) => ({});

const mapDispatch = (dispatch) => {
  return {
    fetchPairs() {
      dispatch(getPairs());
    }
  };
};

export default connect(mapState, mapDispatch)(Workshop)
