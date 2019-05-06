import React, { Component } from 'react'

import { withFirebase } from '../firebase'
import AuthUserContext from './context'

const withAuthentication = Wrapped => {
  class WithAuthentication extends Component {
    state = {
      authUser: JSON.parse(localStorage.getItem('authUser'))
    }
    componentDidMount() {
      // Listener for signup, login and logout user
      this.authListener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          this.setState({ authUser })
        },
        () => {
          localStorage.removeItem('authUser')
          this.setState({ authUser: null })
        }
      )
    }
    componentWillUnmount() {
      // Remove listeners to avoid memory leaks
      this.authListener()
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Wrapped {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFirebase(WithAuthentication)
}

export default withAuthentication
