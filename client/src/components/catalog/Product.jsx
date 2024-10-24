import { Link } from "react-router-dom"

import { ReactComponent as Phone } from "../../assets/phone.svg"

const Product = ({ product }) => {
  const { id, name, images, inStock, fixedPrice, price } = product

  return (
    <div className="product">
      <Link
        className="product-link"
        to={`/catalog/${id}`}
      >
        <div className="image">
          <img
            src={images[0]}
            alt=""
          />
        </div>
        <div className="information">
          <p className="name">{name}</p>
          <p
            className={`instock ${inStock ? "is-in-stock" : ""}`}
            // style={{ color: product.inStock ? "green" : "red" }}
          >
            {inStock ? "• in stock" : "• out of stock"}
          </p>
        </div>
      </Link>
      <Link
        className="product-shop"
        to="/about"
      >
        <div className="shop">
          {/* STC */}
          <p className={`price ${fixedPrice ? "fixed-price" : "unfixed-price"}`}>
            {fixedPrice ? price + "$" : "Price on Request"}
          </p>
          <Phone className="cart" />
          <span className="go-to-contacts-text">
            {product.inStock ? (
              product.fixedPrice ? (
                <p className={`contact-purchase ${inStock ? "contact-in-stock" : ""}`}>
                  Contact for Purchase
                </p>
              ) : (
                <p className={`contact-price ${inStock ? "contact-in-stock" : ""}`}>
                  Contact for Pricing
                </p>
              )
            ) : (
              <p className={`contact-information ${inStock ? "contact-in-stock" : ""}`}>
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
