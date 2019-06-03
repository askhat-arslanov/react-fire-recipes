import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../../firebase'

class Rating extends PureComponent {
  state = {
    rating: 0
  }
  componentDidMount() {
    this._isMounted = true
    const { firebase, recipeId } = this.props
    firebase
      .recipe(recipeId)
      .get()
      .then(doc => {
        const { rating } = doc.data()
        // Check if component is mounted to avoid memory leak
        if (this._isMounted) this.setState({ rating })
      })
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  updateRecipeRating = () => {
    const { firebase, recipeId } = this.props
    firebase.getRatingByRecipeId(recipeId).then(qs => {
      const ratingValues = qs.docs.map(doc => doc.data().value)
      const totalRating = ratingValues.reduce((a, b) => a + b)
      firebase.updateRatingByRecipeId(recipeId, totalRating)
      this.setState({ rating: totalRating })
    })
  }
  generalVote = (userId, callback) => {
    const { firebase, recipeId } = this.props
    // Try to fetch rating instance with certain userId and recipeId
    firebase.getRatingByUserIdAndRecipeId(userId, recipeId).then(qs => {
      let userPrevVote = null
      let currentUserVote
      // If this rating instance exists, update it
      if (qs.size) {
        userPrevVote = qs.docs[0].data().value
        const ratingId = qs.docs[0].id
        currentUserVote = callback(userPrevVote)
        firebase.updateRatingById(ratingId, currentUserVote).then(() => {
          this.updateRecipeRating(currentUserVote)
        })
        // Otherwise add new one to collection
      } else {
        currentUserVote = callback(userPrevVote)
        firebase
          .ratings()
          .add({
            userId,
            recipeId,
            value: currentUserVote
          })
          .then(() => {
            this.updateRecipeRating(currentUserVote)
          })
      }
    })
  }
  handleUpvote = authUser => {
    if (!authUser) this.props.history.push('/signin')
    else
      this.generalVote(authUser.id, userPrevVote =>
        !userPrevVote || userPrevVote === -1 ? 1 : 0
      )
  }
  handleDownvote = authUser => {
    if (!authUser) this.props.history.push('/signin')
    else
      this.generalVote(authUser.id, userPrevVote =>
        !userPrevVote || userPrevVote === 1 ? -1 : 0
      )
  }
  render() {
    const { rating } = this.state
    const { authUser } = this.props
    return (
      <div>
        <div className="rating">
          <a
            className="arrow arrow-up"
            onClick={() => this.handleUpvote(authUser)}
            disabled={!authUser}
          >
            <i className="fa fa-thumbs-o-up" />
          </a>
          <h2 className="rating__value">{rating}</h2>
          <a
            className="arrow arrow-down"
            onClick={() => this.handleDownvote(authUser)}
            disabled={!authUser}
          >
            <i className="fa fa-thumbs-o-down" />
          </a>
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  withRouter
)(Rating)
