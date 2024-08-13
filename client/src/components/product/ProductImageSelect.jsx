import { useState } from "react"

const ProductImageSelect = ({ images, handleSelectImage, currentIndex }) => {
  return (
    <div className="product-image-select-wrapper">
      <div className="product-image-select">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              handleSelectImage(index)
            }}
            className={`${index === currentIndex ? "product-image-selected" : ""}`}
          >
            <img
              src={image}
              alt=" "
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageSelect
