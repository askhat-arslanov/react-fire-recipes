import React from 'react'

const IngredientsInput = ({ ingredients, onChange }) => (
  <div className="ingredients">
    <h2>Ingredients:</h2>
    <textarea
      value={ingredients}
      name="ingredients"
      placeholder={`Put some ingredients new line separated`}
      rows="2"
      onChange={onChange}
    />
  </div>
)

export default IngredientsInput
