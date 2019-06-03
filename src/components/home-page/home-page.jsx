import React, { PureComponent } from 'react'

import { withFirebase } from '../firebase'
import Pagination from '../pagination/pagination'
import RecipeList, { RecipeListLoading } from '../recipe-list'

class HomePage extends PureComponent {
  state = {
    recipes: [],
    loading: false,
    limit: 4,
    prevItems: [],
    lastVisible: null,
    currentPage: 1,
    totalPages: null
  }
  componentDidMount() {
    this.getTotalPages()
    this.getRecipes()
  }
  componentDidUpdate(_, prevState) {
    if (this.state.limit !== prevState.limit) {
      this.getRecipes()
    }
  }
  getTotalPages = async () => {
    const { limit } = this.state
    const { firebase } = this.props
    const qs = await firebase.recipes().get()
    const totalPages = Math.ceil(qs.docs.length / limit)
    this.setState({ totalPages })
  }
  getRecipes = async () => {
    this.setState({ loading: true })
    const { firebase } = this.props
    const { limit, lastVisible, prevItems } = this.state
    const qs = await firebase.fetchRecipeListAfterItem(lastVisible, limit)
    const recipes = convertDocsToArray(qs)
    this.setState({
      lastVisible: qs.docs[qs.docs.length - 1],
      loading: false,
      prevItems: [...prevItems, qs.docs[0]],
      recipes
    })
  }
  handlePrevPage = async () => {
    this.setState({ loading: true })
    const { currentPage, limit, prevItems } = this.state
    const { firebase } = this.props
    const qs = await firebase.fetchRecipeListAtItem(
      prevItems[prevItems.length - 2],
      limit
    )
    const recipes = convertDocsToArray(qs)
    this.setState({
      currentPage: currentPage - 1,
      lastVisible: qs.docs[qs.docs.length - 1],
      loading: false,
      prevItems: [...prevItems.slice(0, prevItems.length - 1)],
      recipes
    })
  }
  handleNextPage = async () => {
    this.setState({ loading: true })
    const {
      currentPage,
      lastVisible,
      limit,
      prevItems,
      totalPages
    } = this.state
    const { firebase } = this.props
    const qs = await firebase.fetchRecipeListAfterItem(lastVisible, limit)
    const recipes = convertDocsToArray(qs)
    this.setState({
      currentPage: currentPage + 1,
      loading: false,
      lastVisible: qs.docs[qs.docs.length - 1],
      recipes
    })
    if (currentPage < totalPages)
      this.setState({ prevItems: [...prevItems, qs.docs[0]] })
  }
  render() {
    const { currentPage, loading, totalPages, limit, recipes } = this.state
    if (loading) return <RecipeListLoading itemsCount={limit} />
    return (
      <React.Fragment>
        <RecipeList recipes={recipes} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={this.handleNextPage}
          onPrevPage={this.handlePrevPage}
        />
      </React.Fragment>
    )
  }
}

export default withFirebase(HomePage)

// Helper functions
function convertDocsToArray(qs) {
  return qs.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}
