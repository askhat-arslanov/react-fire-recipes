import React from 'react'

const ImageInput = ({ imageUrl, onChange }) => (
  <div>
    <input
      type="text"
      id="imageUrl"
      name="imageUrl"
      value={imageUrl}
      placeholder="Add an image url"
      onChange={onChange}
    />
  </div>
)

export default ImageInput
