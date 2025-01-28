import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as Phone } from "../../assets/phone.svg"

const Product = ({ product }) => {
  const { id, name, images, inStock, fixedPrice, price } = product

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  return (
    <div className="product">
      <Link
        className="product-link"
        to={`/catalog/${id}`}
      >
        <div className="image">
          {images?.length > 0 ? (
            <img
              src={images[0] + "/s.webp"}
              alt=""
            />
          ) : (
            ""
          )}
        </div>
        <div className="information">
          <p className="name">{name}</p>
          <p
            className={`instock ${inStock ? "is-in-stock" : ""}`}
            // style={{ color: product.inStock ? "green" : "red" }}
          >
            {inStock ? t("• in stock") : t("• out of stock")}
          </p>
        </div>
      </Link>
      <Link
        className="product-shop"
        to="/about"
      >
        <div className="shop">
          {/* STC */}
          {price !== 0 ? (
            <p className={`price ${fixedPrice ? "fixed-price" : "unfixed-price"}`}>
              {fixedPrice ? price + "$" : t("Price on Request")}
            </p>
          ) : (
            <p className="price">&nbsp;</p>
          )}
          <Phone className="cart" />
          <span className="go-to-contacts-text">
            {product.inStock ? (
              product.fixedPrice ? (
                <p className={`contact-purchase ${inStock ? "contact-in-stock" : ""}`}>
                  {t("Contact for Purchase")}
                </p>
              ) : (
                <p className={`contact-price ${inStock ? "contact-in-stock" : ""}`}>
                  {t("Contact for Pricing")}
                </p>
              )
            ) : (
              <p className={`contact-information ${inStock ? "contact-in-stock" : ""}`}>
                {t("Contact for Information")}
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
