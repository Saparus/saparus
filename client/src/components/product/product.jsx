import { useParams } from "react-router-dom"

import ProductImageSelect from "./ProductImageSelect"

import { products_template } from "../products"

const fetchProduct = (id) => {
  return products_template.filter((product) => product.id === id)[0]
}

const Product = () => {
  const { id } = useParams()

  const product = fetchProduct(Number(id))

  return (
    <div className="page product-page">
      <div className="product-container">
        <div className="product-image-wrapper">
          <div className="product-image">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
              />
            ) : (
              <div className="image-not-found-message">Image not found</div>
            )}

            <div className="product-order">
              <div className="price">{product.price}</div>
              <button className="contact">contact</button>
            </div>
          </div>
        </div>
        <div className="product-information">
          <p className="product-name">{product.name}</p>
          <p
            className="product-status"
            style={{ color: product.inStock ? "green" : "red" }}
          >
            {product.inStock ? "• in stock" : "• out of stock"}
          </p>
          <p className="product-description">{product.description}</p>
          <ProductImageSelect />
        </div>
      </div>
    </div>
  )
}

export default Product
