import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import './app.scss'
import { withAuthentication, AuthUserContext } from '../session'
import Best from '../best'
import Bookmarks from '../bookmarks'
import CreateRecipe from '../create-recipe'
import HomePage from '../home-page'
import Navbar from '../navbar'
import NotFound from '../not-found'
import RecipeDetails from '../recipe-details'
import SignInPage from '../sign-in'
import SignUpPage from '../sign-up'

const App = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="app">
          <Navbar className="app__navbar" />
          <main className="app__content">
            <Switch>
              <Route exact path="/recipes" component={HomePage} />
              <Route
                path="/create"
                render={props => (
                  <CreateRecipe {...props} authUser={authUser} />
                )}
              />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/best" component={Best} />
              <Route
                path="/bookmarks"
                render={props => <Bookmarks {...props} authUser={authUser} />}
              />
              <Route
                path="/recipes/:recipeId"
                render={props => (
                  <RecipeDetails {...props} authUser={authUser} />
                )}
              />
              <Redirect exact from="/" to="/recipes" />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </div>
      )}
    </AuthUserContext.Consumer>
  )
}

export default withAuthentication(App)
