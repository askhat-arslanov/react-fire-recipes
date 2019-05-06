import React from 'react'

import Rating from './rating'

const TopSection = ({
  authUser,
  authorName,
  rating,
  recipeId,
  servings,
  time
}) => (
  <div className="recipe-details__top-section">
    <div className="recipe__rating">
      <Rating recipeId={recipeId} authUser={authUser} rating={rating} />
    </div>
    <p className="recipe-details__author">
      By {authorName ? authorName : 'Spanchbob'}
    </p>
    <div className="recipe-details__yield">
      <i className="fa fa-users" /> {servings} servings
    </div>
    <div className="recipe-details__cooking-time">
      <i className="fa fa-clock-o" /> {time} minutes
    </div>
  </div>
)

export default TopSection
