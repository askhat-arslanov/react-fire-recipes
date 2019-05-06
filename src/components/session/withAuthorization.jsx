import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../firebase'
import { AuthUserContext } from './index'

const withAuthorization = condition => Wrapped => {
  class WithAuthorization extends Component {
    componentDidMount() {
      const { firebase, history } = this.props
      this.authListener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            history.push('/signin')
          }
        },
        () => {
          history.push('/signin')
        }
      )
    }
    componentWillUnmount() {
      this.authListener()
    }
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Wrapped {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization)
}

export default withAuthorization
