import React from 'react'

const TitleInput = ({ title, onChange }) => (
  <div>
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      placeholder="Title (3-4 words will be perfect)"
      onChange={onChange}
    />
  </div>
)

export default TitleInput
