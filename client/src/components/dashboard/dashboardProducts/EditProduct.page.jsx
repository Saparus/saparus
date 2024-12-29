import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

// import { getEditProduct } from "../../../data/products"
import { editProduct, getEditProduct } from "../../../services/productServices"

import ProductEditPanel from "./ProductEditPanel"
import Loading from "../../other/Loading"

const EditProductPage = () => {
  const { apiKey } = useOutletContext()

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const { id } = useParams()

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["dashboard-product", id, apiKey], () => getEditProduct(id, apiKey), {
    enabled: !!apiKey,
  })

  const queryClient = useQueryClient()

  const editProductMutation = useMutation({
    mutationFn: async (product) => {
      const { name, description, categories, images, inStock, fixedPrice, price, id } = product

      return await editProduct(
        name,
        description,
        images,
        inStock,
        fixedPrice,
        price,
        categories,
        id,
        apiKey
      )
    },
    onSuccess: () => {
      toast.success(t("Changes saved successfully"))
      queryClient.invalidateQueries(["products", apiKey]) // this will cause refetching
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(
        t(
          "Something went wrong while adding product, check browser console for more detailed explanation"
        )
      )
    },
  })

  if (isLoading) return <Loading />
  if (error || !product) return <div>{t("Something went wrong")}</div>

  return (
    <ProductEditPanel
      product={product}
      onSave={editProductMutation.mutate}
    />
  )
}

export default EditProductPage
