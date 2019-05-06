import React from 'react'

import './recipe-list.css'
import { PizzaSpinner } from '../spinner'

const RecipeListLoading = ({ itemsCount }) => {
  const loadingItems = Array.from({ length: itemsCount }, (_, i) => (
    <RecipeItemLoading key={i} />
  ))
  return (
    <div className="recipe-list">
      {<React.Fragment>{loadingItems}</React.Fragment>}
    </div>
  )
}

const RecipeItemLoading = () => {
  return (
    <div className="recipe-item">
      <div className="recipe-item-loading__image">
        <PizzaSpinner />
      </div>
      <div className="recipe-item-loading__info">
        <h3 className="recipe-item-loading__title" />
        <p className="recipe-item-loading__description" />
      </div>
    </div>
  )
}

export default RecipeListLoading
