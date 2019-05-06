import React from 'react'

import Ingredients from './ingredients'
import Steps from './steps'

const BottomSection = ({ ingredients, steps }) => (
  <div className="recipe-details__bottom-section">
    <Ingredients ingredients={ingredients} />
    <Steps steps={steps} />
  </div>
)

export default BottomSection
