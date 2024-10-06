import { useOutletContext } from "react-router-dom"

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
  inStock: false,
  price: 0,
  fixedPrice: false,
  images: [],
}

const AddProductPage = () => {
  const { token } = useOutletContext()

  return (
    <ProductEditPanel
      product={emptyProductData}
      onSave={addProduct}
      token={token}
    />
  )
}

export default AddProductPage
