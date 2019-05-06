import React from 'react'

const ServingsInput = ({ servings, onChange }) => (
  <div>
    <input
      value={servings}
      type="number"
      name="servings"
      id="servings"
      placeholder="Servings"
      onChange={onChange}
    />
  </div>
)

export default ServingsInput
