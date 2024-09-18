import { Link } from "react-router-dom"

import { ReactComponent as Phone } from "../../assets/phone.svg"

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link
        className="product-link"
        to={`/catalog/${product.id}`}
      >
        <div className="image">
          <img
            src={product.images[0]}
            alt=""
          />
        </div>
        <div className="information">
          <p className="name">{product.name}</p>
          <p
            className={`instock ${product.inStock ? "is-in-stock" : ""}`}
            // style={{ color: product.inStock ? "green" : "red" }}
          >
            {product.inStock ? "• in stock" : "• out of stock"}
          </p>
        </div>
      </Link>
      <Link
        className="product-shop"
        to="/about"
      >
        <div className="shop">
          {/* STC */}
          <p className="price">{product.fixedPrice ? product.price + "$" : "Price on Request"}</p>
          <Phone className="cart" />
          <span className="go-to-contacts-text">
            {product.inStock ? (
              product.fixedPrice ? (
                <p className={`contact-purchase ${product.inStock ? "contact-in-stock" : ""}`}>
                  Contact for Purchase
                </p>
              ) : (
                <p className={`contact-price ${product.inStock ? "contact-in-stock" : ""}`}>
                  Contact for Pricing
                </p>
              )
            ) : (
              <p className={`contact-information ${product.inStock ? "contact-in-stock" : ""}`}>
                Contact for Information
              </p>
            )}
          </span>
          {/* STC */}
        </div>
      </Link>
    </div>
  )
}

export default Product
