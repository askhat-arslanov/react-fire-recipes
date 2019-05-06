import React from 'react'

const TimeInput = ({ time, onChange }) => (
  <div>
    <input
      value={time}
      type="number"
      name="time"
      placeholder="Cooking time"
      onChange={onChange}
    />
  </div>
)

export default TimeInput
