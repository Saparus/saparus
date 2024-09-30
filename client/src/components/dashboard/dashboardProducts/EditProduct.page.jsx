import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom"

import { getEditProduct } from "../../../data/products"
import { editProduct } from "../../../services/ajax"

import ProductEditPanel from "./ProductEditPanel"
import Loading from "../../other/Loading"

const EditProductPage = () => {
  const { token } = useOutletContext()

  const { id } = useParams()

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["dashboard-product", id, token], () => getEditProduct(id, token))

  if (isLoading) return <Loading />
  if (error || !product) return <div>Something went wrong</div>

  return (
    <ProductEditPanel
      product={product}
      onSave={editProduct}
      token={token}
    />
  )
}

export default EditProductPage
