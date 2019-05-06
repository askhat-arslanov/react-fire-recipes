import React from 'react'

const StepsInput = ({ steps, onChangeStep }) => (
  <div className="steps">
    <h2>Steps:</h2>
    {steps.map((step, id) => (
      <div key={id}>
        <textarea
          id={`step-${id + 1}`}
          value={step}
          name={id}
          placeholder={`Step ${id + 1}`}
          rows="2"
          onChange={onChangeStep}
        />
      </div>
    ))}
  </div>
)

export default StepsInput
