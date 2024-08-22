import { Link } from "react-router-dom"
import { products_template } from "../../data/products"
import filterProducts from "./filter"

import Product from "./product"

const Products = ({ filtered }) => {
  const filteredProducts = filterProducts(products_template, filtered)
  return (
    <div className="products">
      {filteredProducts.length ? (
        filteredProducts.map((product, index) => (
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
