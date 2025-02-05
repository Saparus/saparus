import { Link, useSearchParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { getProducts } from "../../../services/productServices"
import { deleteProduct } from "../../../services/productServices"

import Loading from "../../other/Loading"
import Product from "./EditProductLink"
import PageSelect from "../../catalog/PageSelect"

const ProductList = ({ filter, resetFilter, apiKey }) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(
    ["products", filter, currentLanguage, limit, page],
    () => getProducts(filter, currentLanguage, limit, page)
  )

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteProduct(id, apiKey)
    },
    onMutate: () => {
      toast.loading(t("Deleting product..."))
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success(t("Successfully deleted product"))

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("products"),
      })

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("categories"),
      })

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("companies"),
      })
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      toast.dismiss()
      console.log(errorMessage)
      toast.error(errorMessage)
    },
  })

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
    if (error || !data?.products) return <div>{t("Something went wrong")}</div>

    const { products, pagination } = data

    if (products.length === 0) {
      return (
        <>
          <div className="reset-filters">
            <h3 className="products-not-found-message">
              {t("Products not found")},{" "}
              <Link to="../../admin/products/add">{t("click here to add new product")}</Link>
            </h3>
          </div>
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
                handleDelete={() => {
                  deleteProductMutation.mutate(product.id)
                }}
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
