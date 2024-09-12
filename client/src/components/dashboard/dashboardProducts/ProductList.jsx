import { useSearchParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

import { getProducts } from "../../../data/products"

import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"

import Loading from "../../other/Loading"
import Product from "./Product"

const ProductList = ({ filter, resetFilter }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery(
    ["products", filter, currentLanguage, limit, page],
    () => getProducts(filter, currentLanguage, limit, page)
  )

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage })
    scrollToTop()
  }

  const goToNextPage = () => {
    goToPage(page + 1)
  }

  const goToPreviousPage = () => {
    goToPage(Math.max(page - 1, 1))
  }

  useEffect(() => {
    scrollToTop()
  }, [page])

  if (isLoading) return <Loading />
  if (error || !data) return <div>Something went wrong</div>

  const { products, pagination } = data

  const currentPage = pagination.currentPage
  const totalPages = pagination?.totalPages || 1
  const maximumPages = 10
  const pageNumbers = []

  // Calculate start and end page for the range
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(maximumPages / 2), totalPages - maximumPages + 1)
  )
  const endPage = Math.min(totalPages, startPage + maximumPages - 1)

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="products">
      {products.length ? (
        <>
          <div className="product-list">
            {products.map((product, index) => (
              <Product
                key={index}
                product={product}
              />
            ))}
          </div>
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
                className={`page-number-button ${pageNumber === page ? "active" : ""}`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`next-page-button ${pagination?.hasNextPage ? "" : "disabled"}`}
              onClick={goToNextPage}
              disabled={!pagination?.hasNextPage}
            >
              <ArrowIcon className="next-arrow" />
            </button>
          </div>
        </>
      ) : (
        <button
          className="reset-filters"
          onClick={(e) => {
            resetFilter(e)
            goToPage(1)
          }}
        >
          <h3 className="products-not-found-message">
            Products not found, <span>click here to reset filters</span>
          </h3>
        </button>
      )}
    </div>
  )
}

export default ProductList
