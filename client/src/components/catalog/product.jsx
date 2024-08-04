import { Link } from "react-router-dom"

import { ReactComponent as Phone } from "../../assets/phone.svg"

const Product = ({ product }) => {
  return (
    <Link
      to={`/catalog/${product.id}`}
      className="product"
    >
      <div className="image">
        <img
          src={product.image}
          alt=""
        />
      </div>
      <div className="information">
        <p className="name">{product.name}</p>
        <div className="shop">
          <p className="price">{product.price}</p>
          <p
            className="instock"
            style={{ color: product.inStock ? "green" : "red" }}
          >
            {product.inStock ? "• in stock" : "• out of stock"}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Product
