import React from 'react'

import './pagination.scss'

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => (
  <div className="pagination">
    <button
      className="pagination__prev-page"
      onClick={onPrevPage}
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <button
      href="#"
      className="pagination__next-page"
      onClick={onNextPage}
      disabled={currentPage >= totalPages}
    >
      Next
    </button>
  </div>
)

export default Pagination
