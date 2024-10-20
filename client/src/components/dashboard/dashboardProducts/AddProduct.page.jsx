import { useOutletContext } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

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
  const { token } = useOutletContext()

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: async (product) => {
      const { name, description, images, inStock, fixedPrice, price, categories, id } = product

      return await addProduct(
        name,
        description,
        images,
        inStock,
        fixedPrice,
        price,
        categories,
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

  return (
    <ProductEditPanel
      product={emptyProductData}
      onSave={addProductMutation.mutate}
      token={token}
    />
  )
}

export default AddProductPage
