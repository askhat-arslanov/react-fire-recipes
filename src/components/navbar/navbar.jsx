import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.scss'
import { AuthUserContext } from '../session'
import SignOutLink from '../sign-out'

const Navbar = () => (
  <header>
    <ul className="navbar">
      <GeneralLinks />
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <AuthLinks /> : <NonAuthLinks />)}
      </AuthUserContext.Consumer>
    </ul>
  </header>
)

const GeneralLinks = () => (
  <React.Fragment>
    <li className="navbar__link">
      <NavLink exact to="/recipes">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-home" />
          </span>
          <span className="navbar__link--title">Home</span>
        </span>
      </NavLink>
    </li>
    <li className="navbar__link">
      <NavLink exact to="/best">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-thumbs-up" />
          </span>
          <span className="navbar__link--title">The top 10</span>
        </span>
      </NavLink>
    </li>
  </React.Fragment>
)

const AuthLinks = () => (
  <React.Fragment>
    <li className="navbar__link">
      <NavLink to="/create">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-plus-square" />
          </span>
          <span className="navbar__link--title">Add recipe</span>
        </span>
      </NavLink>
    </li>
    <li className="navbar__link">
      <NavLink to="/bookmarks">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-bookmark" />
          </span>
          <span className="navbar__link--title">Bookmarks</span>
        </span>
      </NavLink>
    </li>
    <li className="navbar__link navbar__sign-out">
      <SignOutLink />
    </li>
  </React.Fragment>
)

const NonAuthLinks = () => (
  <React.Fragment>
    <li className="navbar__link">
      <NavLink to="/signin">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-sign-in" />
          </span>
          <span className="navbar__link--title">Sign In</span>
        </span>
      </NavLink>
    </li>
    <li className="navbar__link--accent">
      <Link className="btn btn-accent" to="/signup">
        <span>
          <span className="navbar__link--icon">
            <i className="fa fa-user-plus" />
          </span>
          <span className="navbar__link--title">Sign Up</span>
        </span>
      </Link>
    </li>
  </React.Fragment>
)

export default Navbar
