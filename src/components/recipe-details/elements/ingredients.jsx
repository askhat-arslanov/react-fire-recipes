import React from 'react'

const Ingredients = ({ ingredients }) => (
  <div className="recipe-details__ingredients">
    <h2>Ingredients:</h2>
    <ul className="recipe-details__ingredient-list">
      {ingredients.map(ingr => (
        <li key={ingr} className="recipe-details__ingredient">
          {ingr}
        </li>
      ))}
    </ul>
  </div>
)

export default Ingredients
