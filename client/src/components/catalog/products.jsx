import { Link } from "react-router-dom"
import { useQuery } from "react-query"

import { products_template } from "../../data/products"
import { getProducts } from "../../data/products"

import Product from "./product"

const Products = ({ filter }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products", filter], () => getProducts(filter))

  if (isLoading) return <div>Loading...</div>

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
