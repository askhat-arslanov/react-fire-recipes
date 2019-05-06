import React from 'react'

const MidSection = ({ description, imageUrl }) => (
  <div className="recipe-details__mid-section">
    <p className="recipe-details__description">{description}</p>
    <div className="recipe-details__img-wrapper">
      <img className="recipe-details__img" src={imageUrl} alt="Ready meal" />
    </div>
  </div>
)

export default MidSection
