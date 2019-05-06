import React, { Component } from 'react'

class Step extends Component {
  state = {
    done: false
  }
  handleDone = () => {
    this.setState(state => ({ done: !state.done }))
  }
  render() {
    const { done } = this.state
    const { idx, step } = this.props
    let classNames = 'recipe-details__step'
    if (done) classNames += ' done'
    return (
      <li onClick={this.handleDone} className={classNames}>
        <span className="recipe-details__steps--number">Step {idx + 1}</span>
        <p>{step}</p>
      </li>
    )
  }
}
export default Step
