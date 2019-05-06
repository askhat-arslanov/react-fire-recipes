import React from 'react'
import { Link } from 'react-router-dom'

import { withFirebase } from '../firebase'

const SignOutLink = ({ firebase }) => (
  <Link to="/" onClick={firebase.doSignOut}>
    <span>
      <span className="navbar__link--icon">
        <i className="fa fa-sign-out" />
      </span>
      <span className="navbar__link--title">Sign Out</span>
    </span>
  </Link>
)

export default withFirebase(SignOutLink)
