import React from 'react'

import { RippleSpinner } from '../../spinner'

const Header = ({
  authUser,
  loadingIfInBookmarks,
  recipeId,
  savedToBookmarks,
  title,
  onToggleBookmark
}) => (
  <div className="recipe-details__header">
    <h1 className="recipe-details__title">{title}</h1>
    <button
      className="recipe-details__to-bookmark btn btn-accent"
      onClick={() => onToggleBookmark(authUser, recipeId)}
    >
      {loadingIfInBookmarks ? (
        <RippleSpinner />
      ) : savedToBookmarks ? (
        <span>
          Saved <i className="fa fa-bookmark" />
        </span>
      ) : (
        <span>
          Save <i className="fa fa-bookmark-o" />
        </span>
      )}
    </button>
  </div>
)

export default Header
