import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"

// import { getEditProduct } from "../../../data/products"
import { editProduct, getEditProduct } from "../../../services/productServices"

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

  const queryClient = useQueryClient()

  const editProductMutation = useMutation({
    mutationFn: async (product) => {
      const { name, description, company, type, images, inStock, fixedPrice, price, id } = product

      return await editProduct(
        name,
        description,
        company,
        type,
        images,
        inStock,
        fixedPrice,
        price,
        id,
        token
      )
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["products", token]) // this will cause refetching
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(
        "Something went wrong while adding product, check browser console for more detailed explanation"
      )
    },
  })

  if (isLoading) return <Loading />
  if (error || !product) return <div>Something went wrong</div>

  return (
    <ProductEditPanel
      product={product}
      onSave={editProductMutation.mutate}
      token={token}
    />
  )
}

export default EditProductPage
