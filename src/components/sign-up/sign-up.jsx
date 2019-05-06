import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import './sign-up.css'
import { withFirebase } from '../firebase'
import { SignInLink } from '../sign-in'
import { RippleSpinner } from '../spinner'

const SignUpPage = () => (
  <div className="signup-page">
    <h1 className="signup-page__header">Sign Up</h1>
    <SignUpForm />
    <SignInLink />
  </div>
)

const INIT_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  loading: false
}

class SignUpFormBase extends Component {
  state = { ...INIT_STATE }
  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({ [name]: value })
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ loading: true, error: null })
    const { username, email, passwordOne } = this.state
    const { firebase, history } = this.props
    // Create user in internal Firebase Auth DB
    firebase
      .doSignUp(email, passwordOne)
      .then(authUser => {
        // And then create user in Firestore with extended fields
        firebase
          .users()
          .doc(authUser.user.uid)
          .set({ username, email })
          .then(() => {
            this.setState({ ...INIT_STATE })
            history.push('/')
          })
          .catch(error => this.setState({ error, loading: false }))
      })
      .catch(error => this.setState({ error, loading: false }))
  }
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      loading
    } = this.state
    const isInvalid =
      passwordOne !== passwordTwo || !username || !email || !passwordOne
    return (
      <form className="signup-page__form" onSubmit={this.handleSubmit}>
        <div>
          <input
            type="username"
            value={username}
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            value={passwordOne}
            name="passwordOne"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            value={passwordTwo}
            name="passwordTwo"
            placeholder="Confirm password"
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-green" type="submit" disabled={isInvalid}>
          {loading ? <RippleSpinner /> : 'Create'}
        </button>
        {error && <p className="error-message">{error.message}</p>}
      </form>
    )
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

const SignUpLink = () => (
  <div className="signup-link">
    Doesn't have an account?{' '}
    <Link className="underline" to="/signup">
      Sign Up
    </Link>
  </div>
)

export default SignUpPage
export { SignUpLink }
