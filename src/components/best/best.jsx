import React, { Component } from 'react'

import { withFirebase } from '../firebase'
import RecipeList from '../recipe-list'
import { FoodSpinner } from '../spinner'

class Best extends Component {
  state = {
    recipes: [],
    loading: false
  }
  componentDidMount() {
    const { firebase } = this.props
    this.setState({ loading: true })
    firebase
      .fetchTenBestRecipes()
      .then(qs => {
        const recipes = qs.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        this.setState({ recipes })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  render() {
    const { recipes, loading } = this.state
    if (loading) return <FoodSpinner />
    return <RecipeList recipes={recipes} />
  }
}

export default withFirebase(Best)
