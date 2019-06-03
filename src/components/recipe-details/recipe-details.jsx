import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import './recipe-details.scss'
import { withFirebase } from '../firebase'
import { FoodSpinner } from '../spinner'
import { Header, TopSection, MidSection, BottomSection } from './elements'

class RecipeDetails extends Component {
  state = {
    authorName: '',
    description: '',
    difficulty: 1,
    imageUrl: '',
    ingredients: [],
    rating: 0,
    servings: 1,
    steps: [],
    time: 10,
    title: '',

    loading: false,
    authUser: null,
    savedToBookmarks: false,
    loadingIfInBookmarks: false
  }
  componentDidMount() {
    const { recipeId } = this.props.match.params
    const { authUser, firebase, history } = this.props
    this.setState({ loading: true })
    firebase
      .recipe(recipeId)
      .get()
      .then(doc => {
        if (doc.exists) {
          const recipe = doc.data()
          this.setState({ ...recipe })
          if (authUser) this.updateStateRecipeIsInBookmarks()
        } else {
          history.push('/not-found')
          return false
        }
        this.setState({ loading: false })
      })
      .catch(error => {
        console.log(error)
        history.push('/not-found')
      })
  }
  shouldComponentUpdate(nextProps, _) {
    if (this.state.authUser !== nextProps.authUser) return true
    return false
  }
  checkIfRecipeIsInBookmarks = callback => {
    const { recipeId } = this.props.match.params
    const { authUser, firebase } = this.props
    firebase.getBookmarkByUserAndRecipe(authUser.id, recipeId).then(qs => {
      callback(qs)
    })
  }
  updateStateRecipeIsInBookmarks = () => {
    this.setState({ loadingIfInBookmarks: true })
    this.checkIfRecipeIsInBookmarks(qs => {
      if (qs.size) this.setState({ savedToBookmarks: true })
    })
    this.setState({ loadingIfInBookmarks: false })
  }
  handleToggleBookmark = (authUser, recipeId) => {
    const { firebase, history } = this.props
    const { title } = this.state
    if (authUser) {
      this.setState({ loadingIfInBookmarks: true })
      this.checkIfRecipeIsInBookmarks(qs => {
        if (qs.size) this.deleteFromBookmarks(firebase, qs.docs[0].id)
        else this.addToBookmarks(firebase, authUser, recipeId, title)
      })
    } else {
      history.push('/signin')
    }
  }
  addToBookmarks = (firebase, authUser, recipeId, title) => {
    firebase
      .addToBookmarks(authUser.id, recipeId, title)
      .then(() => {
        this.setState({ savedToBookmarks: true })
      })
      .catch(error => {
        console.log(error.message)
      })
      .finally(() => {
        this.setState({ loadingIfInBookmarks: false })
      })
  }
  deleteFromBookmarks = (firebase, id) => {
    firebase
      .deleteFromBookmarks(id)
      .then(() => {
        this.setState({ savedToBookmarks: false })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ loadingIfInBookmarks: false })
      })
  }
  render() {
    const { recipeId } = this.props.match.params
    const { authUser } = this.props
    const {
      authorName,
      description,
      imageUrl,
      ingredients,
      rating,
      servings,
      steps,
      time,
      title,

      loading,
      loadingIfInBookmarks,
      savedToBookmarks
    } = this.state
    if (loading) return <FoodSpinner />
    return (
      <div className="recipe-details">
        <Header
          authUser={authUser}
          loadingIfInBookmarks={loadingIfInBookmarks}
          recipeId={recipeId}
          savedToBookmarks={savedToBookmarks}
          title={title}
          onToggleBookmark={this.handleToggleBookmark}
        />
        <TopSection
          authUser={authUser}
          authorName={authorName}
          rating={rating}
          recipeId={recipeId}
          servings={servings}
          time={time}
        />
        <MidSection description={description} imageUrl={imageUrl} />
        <BottomSection ingredients={ingredients} steps={steps} />
      </div>
    )
  }
}

export default compose(
  withFirebase,
  withRouter
)(RecipeDetails)
