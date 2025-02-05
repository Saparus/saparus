import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg"

const ProductImageSelect = ({
  images,
  handleSelectImage,
  currentIndex,
  maxSimultaneousImages = 4,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "products" })

  const [slideIndex, setSlideIndex] = useState(0)

  const handlePrev = () => {
    setSlideIndex((prevIndex) => {
      if (prevIndex < 0) {
        return Math.ceil(images.length / maxSimultaneousImages) - 1
      } else {
        return Math.max(prevIndex - 1, 0)
      }
    })
  }

  const handleNext = () => {
    setSlideIndex((prevIndex) => {
      if (prevIndex + 1 >= images.length) {
        return 0
      } else {
        return Math.min(prevIndex + 1, images.length - maxSimultaneousImages)
      }
    })
  }

  useEffect(() => {
    const isCurrentImageVisible =
      currentIndex >= slideIndex && currentIndex < slideIndex + maxSimultaneousImages

    if (!isCurrentImageVisible) {
      const newSlideIndex = Math.max(
        0,
        Math.min(images.length - maxSimultaneousImages, currentIndex - (maxSimultaneousImages - 1))
      )

      setSlideIndex(newSlideIndex)
    }
  }, [currentIndex, maxSimultaneousImages, images.length])

  if (!images) return null

  const renderImages = () => {
    return images.slice(slideIndex, slideIndex + maxSimultaneousImages).map((image, index) => (
      <button
        key={index}
        onClick={() => {
          handleSelectImage(index + slideIndex)
        }}
        className={`image-button ${
          index + slideIndex === currentIndex ? "product-image-selected" : ""
        }`}
      >
        {image ? (
          <img
            src={image}
            alt=" "
          />
        ) : (
          <div className="image-not-found-message-small">{t("Image not found")}</div>
        )}
      </button>
    ))
  }

  const renderPrevArrow = () => {
    return (
      <button
        onClick={handlePrev}
        className="prev-button"
        disabled={slideIndex === 0}
      >
        <ArrowIcon className="prev-arrow" />
        {slideIndex > 0 ? <span className="hidden-images-count">+{slideIndex}</span> : ""}
      </button>
    )
  }

  const renderNextArrow = () => {
    return (
      <button
        onClick={handleNext}
        className="next-button"
        disabled={slideIndex + maxSimultaneousImages >= images.length}
      >
        <ArrowIcon className="next-arrow" />
        {images.length - (slideIndex + maxSimultaneousImages) > 0 ? (
          <span className="hidden-images-count">
            +{images.length - (slideIndex + maxSimultaneousImages)}
          </span>
        ) : (
          ""
        )}
      </button>
    )
  }

  return (
    <div className="product-image-select-wrapper">
      <div className="product-image-select">
        {renderPrevArrow()}
        {renderImages()}
        {renderNextArrow()}
      </div>
    </div>
  )
}

export default ProductImageSelect
