import React from 'react'

const DescInput = ({ description, onChange }) => (
  <div className="description">
    <textarea
      value={description}
      name="description"
      placeholder="Make up some cool description"
      rows="2"
      onChange={onChange}
    />
  </div>
)

export default DescInput
