import React from 'react'

const AddStepButton = ({ onAddStep }) => (
  <button className="btn btn-green-outline btn-add-step" onClick={onAddStep}>
    <i className="fa fa-plus-square" /> step
  </button>
)

export default AddStepButton
