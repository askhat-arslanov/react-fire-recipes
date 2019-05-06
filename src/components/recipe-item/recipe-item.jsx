import React from 'react'
import { Link } from 'react-router-dom'

import './recipe-item.css'

const RecipeItem = ({
  id,
  imageUrl,
  rating,
  servings,
  time,
  title,
  difficulty
}) => {
  const ratingStyle = getRatingStyle(rating)
  const difficultyProps = getDifficultyProps(difficulty)
  const formattedTitle = formatTitle(title)
  return (
    <div className="recipe-item">
      <div className="recipe-item__image-wrapper">
        <img className="recipe-item__image" src={imageUrl} alt="recipe" />
      </div>
      <div className="recipe-item__info">
        <h3 className="recipe-item__title">
          <Link to={`/recipes/${id}`}>
            <span className="recipe-item__title--formatted">
              {formattedTitle}
            </span>
            <span className="recipe-item__title--full">{title}</span>
          </Link>
        </h3>
        <p className="recipe-item__time">
          <i className="fa fa-clock-o" /> {time} minutes
        </p>
        <p className="recipe-item__servings">
          <i className="fa fa-users" /> {servings} servings
        </p>
        <div className={difficultyProps.style}>{difficultyProps.title}</div>
        <div className={ratingStyle}>{rating}</div>
      </div>
    </div>
  )
}

export default RecipeItem

// Helper functions
function getRatingStyle(rating) {
  let ratingStyle = 'recipe-item__rating '
  ratingStyle +=
    (rating < 0 && 'rating-red') ||
    (rating === 0 && 'rating-yellow') ||
    (rating > 0 && 'rating-green')
  return ratingStyle
}
function getDifficultyProps(difficulty) {
  const difficultyProps = {
    1: { title: 'easy', style: 'difficulty-green' },
    2: { title: 'medium', style: 'difficulty-yellow' },
    3: { title: 'chef 80 lvl', style: 'difficulty-red' }
  }[difficulty]
  difficultyProps.style = `recipe-item__difficulty ${difficultyProps.style}`
  return difficultyProps
}
function formatTitle(title) {
  return title.split(' ').length <= 4
    ? title
    : `${title
        .split(' ')
        .slice(0, 4)
        .join(' ')}...`
}
