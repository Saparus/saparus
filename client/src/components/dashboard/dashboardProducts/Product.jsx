import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { editProduct } from "../../../services/ajax"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"

const Product = ({ product }) => {
  return (
    <Link
      to={`./edit/${product.id}`}
      className="dashboard-product product"
    >
      <div
        className="product-link"
        to={`./edit/${product.id}`}
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
            className="instock"
            style={{ color: product.inStock ? "green" : "red" }}
          >
            {product.inStock ? "• in stock" : "• out of stock"}
          </p>
        </div>
      </div>

      <div className="product-shop">
        <div className="shop">
          <p>{product.fixedPrice ? product.price + "$" : "Price on Request"}</p>
        </div>

        {/* {activeFields.inStock ? (
          <input
            ref={inStockRef}
            type="checkbox"
            name="inStock"
            checked={productInformation.inStock}
            onChange={handleOnChange}
          />
        ) : (
          <button
            onClick={handleInStockEditStart}
            className="instock-edit"
          >
            {productInformation.inStock ? "In Stock" : "Out of Stock"}
          </button>
        )} */}
      </div>
    </Link>
  )
}

export default Product
