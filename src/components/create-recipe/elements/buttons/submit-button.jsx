import React from 'react'

import { RippleSpinner } from '../../../spinner'

const SubmitButton = ({ isInvalid, loading }) => (
  <button className="btn btn-green" type="submit" disabled={isInvalid}>
    {loading ? <RippleSpinner /> : <span>Create</span>}
  </button>
)

export default SubmitButton
