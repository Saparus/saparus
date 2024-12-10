import { useState, useEffect } from "react"

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg"

const PageSelect = ({ currentPage, totalPages, maximumPages, goToPage }) => {
  const [pageNumbers, setPageNumbers] = useState([])

  const goToNextPage = () => {
    goToPage(Number(currentPage) + 1)
  }

  const goToPreviousPage = () => {
    goToPage(Math.max(Number(currentPage) - 1, 1))
  }

  const goToFirstPage = () => {
    goToPage(1)
  }

  const goToLastPage = () => {
    goToPage(totalPages)
  }

  useEffect(() => {
    const startPage = Math.max(
      1,
      Math.min(Number(currentPage) - Math.floor(maximumPages / 2), totalPages - maximumPages + 1)
    )
    const endPage = Math.min(totalPages, startPage + maximumPages - 1)

    const newPageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
      newPageNumbers.push(i)
    }
    setPageNumbers(newPageNumbers)
  }, [currentPage, totalPages, maximumPages])

  if (totalPages === 1) {
    return ""
  }

  return (
    <>
      <div className="page-select-placeholder"></div>
      <div className="page-select">
        <button
          className={`first-page-button ${Number(currentPage) === 1 ? "" : "disabled"}`}
          onClick={goToFirstPage}
          disabled={Number(currentPage) === 1}
        >
          <ArrowIcon className="prev-arrow" />
          <ArrowIcon className="prev-arrow" />
        </button>
        <button
          className={`prev-page-button ${Number(currentPage) === 1 ? "" : "disabled"}`}
          onClick={goToPreviousPage}
          disabled={Number(currentPage) === 1}
        >
          <ArrowIcon className="prev-arrow" />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number-button ${pageNumber === Number(currentPage) ? "active" : ""}`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`next-page-button ${totalPages > Number(currentPage) ? "" : "disabled"}`}
          onClick={goToNextPage}
          disabled={totalPages <= Number(currentPage)}
        >
          <ArrowIcon className="next-arrow" />
        </button>
        <button
          className={`last-page-button ${totalPages === Number(currentPage) ? "" : "disabled"}`}
          onClick={goToLastPage}
          disabled={totalPages === Number(currentPage)}
        >
          <ArrowIcon className="next-arrow" />
          <ArrowIcon className="next-arrow" />
        </button>
      </div>
    </>
  )
}

export default PageSelect
