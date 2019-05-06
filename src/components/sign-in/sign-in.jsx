import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import './sign-in.css'
import { withFirebase } from '../firebase'
import { SignUpLink } from '../sign-up'
import { RippleSpinner } from '../spinner'

const SignInPage = () => (
  <div className="signin-page">
    <h1 className="signin-page__header">Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
)

const INIT_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false
}

class SignInFormBase extends Component {
  state = { ...INIT_STATE }
  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({ [name]: value })
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ loading: true, error: null })
    const { email, password } = this.state
    const { firebase, history } = this.props
    firebase
      .doSignIn(email, password)
      .then(() => {
        this.setState({ ...INIT_STATE })
        history.push('/')
      })
      .catch(error => this.setState({ error, loading: false }))
  }
  render() {
    const { email, password, error, loading } = this.state
    const isInvalid = !email || !password
    return (
      <div className="signin-page__form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-green" type="submit" disabled={isInvalid}>
            {loading ? <RippleSpinner /> : 'Login'}
          </button>
        </form>
        {error && <p className="error-message">{error.message}</p>}
      </div>
    )
  }
}

const SignInForm = compose(
  withFirebase,
  withRouter
)(SignInFormBase)

const SignInLink = () => (
  <div className="signin-link">
    Already have an account?{' '}
    <Link className="underline" to="/signin">
      Sign In
    </Link>
  </div>
)

export default SignInPage
export { SignInLink }
