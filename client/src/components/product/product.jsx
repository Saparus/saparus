import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import ProductImageSelect from "./ProductImageSelect"

import { products_template } from "../../data/products"

const fetchProduct = (id) => {
  return products_template.filter((product) => product.id === id)[0]
}

const Product = () => {
  // const navigate = useNavigate()
  const { id } = useParams()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const product = fetchProduct(Number(id))

  const handleSelectNextImage = () => {
    setCurrentImageIndex((prevState) => {
      if (prevState + 1 >= product.images.length) return 0
      else return prevState + 1
    })
  }

  const handleSelectPrevImage = () => {
    setCurrentImageIndex((prevState) => {
      if (prevState - 1 < 0) return product.images.length - 1
      else return prevState - 1
    })
  }

  const handleSelectImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex)
  }

  const renderImage = () => {
    return (
      <div className="product-image-wrapper">
        <div className="product-image">
          {product.images.length > 1 ? (
            <>
              <button
                className="change-product-image next"
                onClick={handleSelectNextImage}
              >
                {">"}
              </button>
              <button
                className="change-product-image prev"
                onClick={handleSelectPrevImage}
              >
                {"<"}
              </button>
            </>
          ) : (
            ""
          )}

          {product?.images[0] ? (
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
            />
          ) : (
            <div className="image-not-found-message">Image not found</div>
          )}
          {/* <div className="product-order">
            <div className="price">{product.price}</div>
            <Link
              className="contact"
              to="../about"
            >
              contact
            </Link>
          </div> */}
        </div>
        {/* {product.images.length > 1 ? (
          <ProductImageSelect
            images={product.images}
            handleSelectImage={handleSelectImage}
            currentIndex={currentImageIndex}
          />
        ) : (
          ""
        )} */}
      </div>
    )
  }

  const renderProductInformation = () => {
    return (
      <div className="product-information">
        <p className="product-name">{product.name}</p>
        <div className="product-short-information">
          <p
            className={`product-status ${
              product.inStock ? "product-in-stock" : "product-not-in-stock"
            }`}
          >
            {product.inStock ? "• in stock" : "• out of stock"}
          </p>
          <p className="product-price">
            {product.price === "on request" ? (
              <Link
                className="contact-for-pricing-link"
                to="../about"
              >
                Contact for Pricing
              </Link>
            ) : (
              <>
                {product.price}
                <Link
                  className="contact-for-purchasing-link"
                  to="../about"
                >
                  Contact for Purchase
                </Link>
              </>
            )}
          </p>
        </div>
        <p className="product-description">{product.description}</p>
        {product.images.length > 1 ? (
          <ProductImageSelect
            images={product.images}
            handleSelectImage={handleSelectImage}
            currentIndex={currentImageIndex}
          />
        ) : (
          ""
        )}
      </div>
    )
  }

  return (
    <div className="page product-page">
      <div className="product-container">
        {renderImage()}
        {renderProductInformation()}
      </div>
    </div>
  )
}

export default Product
