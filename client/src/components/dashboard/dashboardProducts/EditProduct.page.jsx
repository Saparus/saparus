import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useOutletContext } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

// import { getEditProduct } from "../../../data/products"
import { editProduct, getEditProduct } from "../../../services/productServices"

import ProductEditPanel from "./ProductEditPanel"
import Loading from "../../other/Loading"

const EditProductPage = () => {
  const navigate = useNavigate()

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
    onMutate: () => {
      toast.loading("Saving product changes...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success(t("Changes saved successfully"))

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("dashboard-product"),
      })

      navigate("../../admin/products")
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      toast.dismiss()
      toast.error(errorMessage)
      console.log(errorMessage)
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
