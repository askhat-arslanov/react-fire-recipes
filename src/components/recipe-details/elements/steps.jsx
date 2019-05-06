import React from 'react'

import Step from './step'

const Steps = ({ steps }) => (
  <div className="recipe-details__steps">
    <h2>Preparation:</h2>
    <ul className="recipe-details__step-list">
      {steps.map((step, idx) => (
        <Step key={step} idx={idx} step={step} />
      ))}
    </ul>
  </div>
)

export default Steps
