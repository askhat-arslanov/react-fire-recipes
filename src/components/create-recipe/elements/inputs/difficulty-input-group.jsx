import React from 'react'

const DifficultyInputGroup = ({ onChangeRadioButton }) => (
  <div className="create-recipe__difficulty">
    <input
      type="radio"
      name="difficulty"
      id="easy"
      value="1"
      onChange={onChangeRadioButton}
    />
    <label className="label-radio" htmlFor="easy">
      Easy
    </label>
    <input
      type="radio"
      name="difficulty"
      id="medium"
      value="2"
      onChange={onChangeRadioButton}
    />
    <label className="label-radio" htmlFor="medium">
      Medium
    </label>
    <input
      type="radio"
      name="difficulty"
      id="hard"
      value="3"
      onChange={onChangeRadioButton}
    />
    <label className="label-radio" htmlFor="hard">
      Chef 80 lvl
    </label>
  </div>
)

export default DifficultyInputGroup
