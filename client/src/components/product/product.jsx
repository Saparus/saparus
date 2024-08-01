import { useParams } from "react-router-dom"

import { products_template } from "../products"

const fetchProduct = (id) => {
  return products_template.filter((product) => product.id === id)[0]
}

const Product = () => {
  const { id } = useParams()

  const product = fetchProduct(Number(id))

  console.log(products_template)

  return (
    <div className="page product-page">
      <div className="product-container">
        <div className="product-content">
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="product-information">
            <p className="product-name">{product.name}</p>
            <p className="product-status">{product.inStock}</p>
            <p className="product-description">{product.description}</p>
          </div>
        </div>

        <div className="product-order">
          <div className="price">{product.price}</div>
          <button className="contact">contact</button>
        </div>
      </div>
    </div>
  )
}

export default Product
