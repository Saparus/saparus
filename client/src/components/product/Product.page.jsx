import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

// import { getProduct } from "../../data/products"
import { getProduct } from "../../services/productServices"

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg"

import ProductImageSelect from "./ProductImageSelect"
import Loading from "../other/Loading"

const Product = () => {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id, currentLanguage], () => getProduct(id, currentLanguage))

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // const product = getProduct(Number(id))

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
                <ArrowIcon className="next-arrow" />
              </button>
              <button
                className="change-product-image prev"
                onClick={handleSelectPrevImage}
              >
                <ArrowIcon className="prev-arrow" />
              </button>
            </>
          ) : (
            ""
          )}

          {product.images[currentImageIndex] ? (
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
            {product.fixedPrice ? (
              <>
                {product.price}$
                <Link
                  className="contact-for-purchasing-link"
                  to="../about"
                >
                  Contact for Purchase
                </Link>
              </>
            ) : (
              <Link
                className="contact-for-pricing-link"
                to="../about"
              >
                Contact for Pricing
              </Link>
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

  const renderProduct = () => {
    if (isLoading) return <Loading />
    if (error || !product) return <div>something went wrong</div>

    return (
      <>
        {renderImage()}
        {renderProductInformation()}
      </>
    )
  }

  return (
    <div className="page product-page">
      <div className="product-container">{renderProduct()}</div>
    </div>
  )
}

export default Product
