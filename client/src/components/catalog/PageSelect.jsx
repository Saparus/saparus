import { useState, useEffect } from "react"

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg"

const PageSelect = ({ currentPage, totalPages, maximumPages, goToPage }) => {
  const [pageNumbers, setPageNumbers] = useState([])

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  const goToPreviousPage = () => {
    goToPage(Math.max(currentPage - 1, 1))
  }

  useEffect(() => {
    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(maximumPages / 2), totalPages - maximumPages + 1)
    )
    const endPage = Math.min(totalPages, startPage + maximumPages - 1)

    const newPageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
      newPageNumbers.push(i)
    }
    setPageNumbers(newPageNumbers)
  }, [currentPage, totalPages, maximumPages])

  return (
    <>
      <div className="page-select-placeholder"></div>
      <div className="page-select">
        <button
          className={`prev-page-button ${currentPage > 1 ? "" : "disabled"}`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <ArrowIcon className="prev-arrow" />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number-button ${pageNumber === currentPage ? "active" : ""}`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`next-page-button ${totalPages > currentPage ? "" : "disabled"}`}
          onClick={goToNextPage}
          disabled={totalPages <= currentPage}
        >
          <ArrowIcon className="next-arrow" />
        </button>
      </div>
    </>
  )
}

export default PageSelect
