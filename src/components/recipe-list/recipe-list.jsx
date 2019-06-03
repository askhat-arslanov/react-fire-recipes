import React from 'react'

import './recipe-list.scss'
import RecipeItem from '../recipe-item'
import EmptyList from '../empty-list'

const RecipeList = ({ recipes }) => (
  <div className="recipe-list">
    {recipes.length ? (
      recipes.map(recipe => <RecipeItem key={recipe.id} {...recipe} />)
    ) : (
      <EmptyList />
    )}
  </div>
)

export default RecipeList
