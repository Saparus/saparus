import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { products_template } from "../../data/products"
import { getProducts } from "../../data/products"

import Loading from "../other/Loading"
import Product from "./product"

const Products = ({ filter }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products", filter, currentLanguage], () => getProducts(filter, currentLanguage))

  if (isLoading) return <Loading />
  if (error || !products) return <div>something went wrong</div>

  return (
    <div className="products">
      {products.length ? (
        products.map((product, index) => (
          <Product
            key={index}
            product={product}
          />
        ))
      ) : (
        <h3 className="products-not-found-message">products not found</h3>
      )}
    </div>
  )
}

export default Products
