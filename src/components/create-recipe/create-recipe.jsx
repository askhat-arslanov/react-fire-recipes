import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import './create-recipe.css'
import { withFirebase } from '../firebase'
import { withAuthorization } from '../session'
import CreateForm from './elements'

const INIT_STATE = {
  loading: false,

  authorId: '',
  authorName: '',
  description: '',
  difficulty: 1,
  ingredients: '',
  imageUrl: '',
  rating: 0,
  servings: '',
  steps: ['', '', ''],
  time: '',
  title: ''
}

class CreateRecipe extends Component {
  state = { ...INIT_STATE }
  componentDidMount() {
    if (this.props.authUser)
      this.setState({
        authorName: this.props.authUser.username,
        authorId: this.props.authUser.id
      })
  }
  componentDidUpdate(_, prevState) {
    if (prevState.authorName !== this.state.authorName)
      this.setState({
        authorName: this.props.authUser.username,
        authorId: this.props.authUser.id
      })
  }
  static getDerivedStateFromProps(nextProps, _) {
    if (nextProps.authUser)
      return {
        authorName: nextProps.authUser.username,
        authorId: nextProps.authUser.id
      }
    return null
  }
  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({ [name]: value })
  }
  handleChangeRadioButton = evt => {
    this.setState({ difficulty: evt.target.value })
  }
  handleChangeStep = evt => {
    const { steps } = this.state
    const { name: id, value } = evt.target
    const newSteps = [...steps.slice(0, +id), value, ...steps.slice(+id + 1)]
    this.setState({ steps: newSteps })
  }
  handleAddStep = evt => {
    evt.preventDefault()
    this.setState(state => ({ steps: [...state.steps, ''] }))
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.setState({ loading: true })
    const { firebase } = this.props
    const { steps, ingredients } = this.state
    const formattedSteps = steps.filter(s => s)
    const splittedIngredients = getSplittedIngredients(ingredients)
    firebase
      .recipes()
      .add({
        ...this.state,
        createdAt: new Date().getTime(),
        ingredients: splittedIngredients,
        steps: formattedSteps
      })
      .then(doc => {
        const { id } = doc
        this.setState({ ...INIT_STATE })
        this.props.history.push(`/recipes/${id}`)
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log(error)
      })
  }
  render() {
    const {
      description,
      imageUrl,
      ingredients,
      title,
      servings,
      time,
      steps,
      loading
    } = this.state
    const isInvalid =
      !description || !imageUrl || !title || !time || !ingredients || !steps[0]
    return (
      <CreateForm
        description={description}
        isInvalid={isInvalid}
        imageUrl={imageUrl}
        ingredients={ingredients}
        loading={loading}
        time={time}
        title={title}
        servings={servings}
        steps={steps}
        onAddStep={this.handleAddStep}
        onChange={this.handleChange}
        onChangeStep={this.handleChangeStep}
        onChangeRadioButton={this.handleChangeRadioButton}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

const condition = authUser => !!authUser

export default compose(
  withAuthorization(condition),
  withFirebase,
  withRouter
)(CreateRecipe)

// Helper functions
function getSplittedIngredients(items) {
  return items
    .split('\n')
    .filter(i => i)
    .map(i => i.trim())
}
