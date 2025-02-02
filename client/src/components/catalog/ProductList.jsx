import { useSearchParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

// import { getProducts } from "../../data/products"
import { getProducts } from "../../services/productServices"

import Loading from "../other/Loading"
import Product from "./Product"
import PageSelect from "./PageSelect"

const ProductList = ({ filter, resetFilter }) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { t } = useTranslation("translation", { keyPrefix: "children program" })

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

  const renderProducts = () => {
    if (isLoading) return <Loading />
    if (error || !data) return <div>{t("Something went wrong")}</div>

    const { products, pagination } = data

    if (products.length === 0) {
      return (
        <>
          <button
            className="reset-filters"
            onClick={(e) => {
              resetFilter(e)
              goToPage(1)
            }}
          >
            <h3 className="products-not-found-message">
              {t("Products not found")}, <span>{t("click here to reset filters")}</span>
            </h3>
          </button>
        </>
      )
    } else {
      return (
        <>
          <div className="product-list">
            {products.map((product, index) => (
              <Product
                key={index}
                product={product}
              />
            ))}
          </div>

          <PageSelect
            currentPage={pagination.currentPage}
            totalPages={pagination?.totalPages || 1}
            maximumPages={10}
            goToPage={goToPage}
          />
        </>
      )
    }
  }

  useEffect(() => {
    scrollToTop()
  }, [page])

  return <div className="products">{renderProducts()}</div>
}

export default ProductList
