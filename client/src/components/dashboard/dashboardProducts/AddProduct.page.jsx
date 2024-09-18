import { addProduct } from "../../../services/ajax"

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
  return (
    <ProductEditPanel
      product={emptyProductData}
      onSave={addProduct}
    />
  )
}

export default AddProductPage
