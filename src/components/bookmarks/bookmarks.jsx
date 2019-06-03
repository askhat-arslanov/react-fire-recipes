import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import './bookmarks.scss'
import { withFirebase } from '../firebase'
import { withAuthorization } from '../session'
import EmptyList from '../empty-list'
import { FoodSpinner } from '../spinner'

class Bookmarks extends PureComponent {
  state = {
    bookmarks: [],
    authUser: null,
    loading: false
  }
  componentDidMount() {
    const { authUser, firebase, history } = this.props
    if (this.state.authUser) {
      this.setState({ loading: true })
      firebase
        .bookmarks()
        .where('userId', '==', authUser.id)
        .get()
        .then(querySnapshot => {
          const bookmarks = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          this.setState({ bookmarks, loading: false })
        })
        .catch(() => {
          this.setState({ loading: false })
        })
    } else {
      history.push('/')
    }
  }
  componentDidUpdate(_, prevState) {
    const { authUser, firebase } = this.props
    if (prevState.authUser !== this.state.authUser) {
      this.setState({ loading: true })
      firebase
        .bookmarks()
        .where('userId', '==', authUser.id)
        .get()
        .then(querySnapshot => {
          const bookmarks = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))
          this.setState({ bookmarks, loading: false })
        })
        .catch(() => {
          this.setState({ loading: false })
        })
    }
  }
  static getDerivedStateFromProps(nextProps, _) {
    if (nextProps.authUser) return { authUser: nextProps.authUser }
    return null
  }
  render() {
    const { bookmarks, loading } = this.state
    if (loading) return <FoodSpinner />
    return (
      <div className="bookmarks__list">
        {bookmarks.length ? (
          bookmarks.map(bookmark => (
            <Bookmark key={bookmark.recipeId} {...bookmark} />
          ))
        ) : (
          <EmptyList />
        )}
      </div>
    )
  }
}

const Bookmark = ({ recipeId, title }) => (
  <Link to={`/recipes/${recipeId}`} className="bookmarks__item">
    {title}
  </Link>
)

const condition = authUser => !!authUser

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter
)(Bookmarks)
