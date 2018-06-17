import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Message, Form, Header } from 'semantic-ui-react'

/**
 * Logs in instructor based on given username and password
 */
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noUsername: false,
      noPassword: false,
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    if(!username.length) {
      this.setState({noUsername: true})
    } else {
      this.setState({noUsername: false})
    }
    if(!password.length) {
      this.setState({noPassword: true})
    } else {
      this.setState({noPassword: false})
    }
    if(username.length && password.length) {
      this.props.getUser(username, password, formName);
      this.setState({noPassword: true, noUsername: true})
    }
  }

  render() {
    const {name, displayName, error} = this.props;
    const {noPassword, noUsername} = this.state;
    return (
      <div id="login-form">
        <Form onSubmit={this.handleSubmit} name={name} error>
          <Form.Field>
            <Header as='h1'>Username</Header>
            <input placeholder='Username' name="username" type="text" />
          </Form.Field>
          {noUsername ? <Message error header='Username required' /> : null}
          <br /><br />
          <Form.Field>
            <Header as='h1'>Password</Header>
            <input placeholder='Password' name="password" type="password" />
          </Form.Field>
          {noPassword ? <Message error header='Password required' /> : null}
          <br /><br />
          <Button type='submit'>{displayName}</Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    getUser(username, password, formName) {
        dispatch(auth(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}
