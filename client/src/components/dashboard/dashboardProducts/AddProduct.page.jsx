import { useOutletContext } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import { addProduct } from "../../../services/productServices"

import ProductEditPanel from "./ProductEditPanel"

const emptyProductData = {
  id: null,
  name: {
    en: "",
    ka: "",
    ru: "",
  },
  description: {
    en: "",
    ka: "",
    ru: "",
  },
  categories: {},
  inStock: false,
  price: 0,
  fixedPrice: false,
  images: [],
}

const AddProductPage = () => {
  const { apiKey } = useOutletContext()

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { name, description, images, inStock, fixedPrice, price, categories } = product

      return await addProduct(
        name,
        description,
        images,
        inStock,
        fixedPrice,
        price,
        categories,
        apiKey
      )
    },
    onSuccess: () => {
      toast.success("Changes saved successfully")
      queryClient.invalidateQueries(["products", apiKey]) // this will cause refetching
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      console.log(errorMessage)
      toast.error(errorMessage)
    },
  })

  return (
    <ProductEditPanel
      product={emptyProductData}
      onSave={addProductMutation.mutate}
      apiKey={apiKey}
    />
  )
}

export default AddProductPage
