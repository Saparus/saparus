import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { getEditProduct } from "../../../data/products"
import { editProduct } from "../../../services/ajax"

import ProductEditPanel from "./ProductEditPanel"
import Loading from "../../other/Loading"

const EditProductPage = () => {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["dashboard-product", id, currentLanguage], () => getEditProduct(id))

  if (isLoading) return <Loading />
  if (error || !product) return <div>Something went wrong</div>

  return (
    <ProductEditPanel
      product={product}
      currentLanguage={currentLanguage}
      onSave={editProduct}
    />
  )
}

export default EditProductPage
