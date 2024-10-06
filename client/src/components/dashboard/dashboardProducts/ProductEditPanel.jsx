import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"
import { ReactComponent as CheckmarkIcon } from "../../../assets/icons/checkmark.svg"
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"

import ProductImageSelect from "../../product/ProductImageSelect"
import ConfirmDeletionModal from "../ConfirmDeletionModal"

const emptyProductData = {
  id: null,
  name: {
    en: "",
    ka: "",
    ru: "",
  },
  description: {
    en: "",
    ka: "",
    ru: "",
  },
  inStock: false,
  price: 0,
  fixedPrice: false,
  images: [],
}

const languages = [
  { code: "en", name: "English" },
  { code: "ka", name: "Georgian" },
  { code: "ru", name: "Russian" },
]

const ProductEditPanel = ({ product, onSave, token }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const { t } = useTranslation("translation", { keyPrefix: "products" })

  const descriptionRef = useRef(null)

  const [currentProduct, setCurrentProduct] = useState(structuredClone(product))
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isUploadPanelVisible, setIsUploadPanelVisible] = useState(false)
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)
  const [isAbleToSave, setIsAbleToSave] = useState(false)
  const [activeFields, setActiveFields] = useState({
    name: false,
    description: false,
    inStock: false,
    price: false,
    fixedPrice: false,
    images: false,
  })

  const handleSelectImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex)
  }

  const handleSelectNextImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState + 1 >= currentProduct.images.length ? 0 : prevState + 1
    )
  }

  const handleSelectPrevImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState - 1 < 0 ? currentProduct.images.length - 1 : prevState - 1
    )
  }

  // const handleAddEmptyImage = () => {
  //   setCurrentProduct((prevState) => ({
  //     ...prevState,
  //     images: [...prevState.images, ""],
  //   }))
  // }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        setCurrentProduct((prevState) => {
          const updatedImages = [...prevState.images, newImage]
          setCurrentImageIndex(updatedImages.length - 1)

          return {
            ...prevState,
            images: [...prevState.images, newImage],
          }
        })
        setIsUploadPanelVisible(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFieldEditStart = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }))
  }

  const handleFieldEditFinish = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }))
  }

  const handleInputChange = (e) => {
    const { name: category, value } = e.target

    setCurrentProduct((prevState) => {
      if (category === "name" || category === "description") {
        return {
          ...prevState,
          [category]: { ...prevState[category], [selectedLanguage]: value },
        }
      }

      if ((category === "price" && Number(value) <= 0) || !value) {
        return {
          ...prevState,
          [category]: 0,
          fixedPrice: false,
        }
      }

      if (category === "price" && value[0] === "0") {
        if (
          product.name.en === value ||
          product.name.ka === value ||
          product.name.ru === value ||
          product.description.en === value ||
          product.description.ka === value ||
          product.description.ru === value ||
          currentProduct.name.en === "" ||
          currentProduct.name.ka === "" ||
          currentProduct.name.ru === "" ||
          currentProduct.description.en === "" ||
          currentProduct.description.ka === "" ||
          currentProduct.description.ru === "" ||
          prevState.fixedPrice === product.fixedPrice ||
          !product.price === currentProduct.price ||
          prevState.inStock === product.inStock ||
          value === ""
        ) {
          setIsAbleToSave(false)
        } else {
          setIsAbleToSave(true)
        }

        return {
          ...prevState,
          [category]: value.slice(1),
          fixedPrice: value.slice(1) !== 0,
        }
      }

      if (category === "price") {
        if (product.price === Number(value) || product.price === value) {
          setIsAbleToSave(false)
        } else {
          setIsAbleToSave(true)
        }

        return {
          ...prevState,
          [category]: Number(value),
          fixedPrice: Number(value) !== 0,
        }
      }

      return {
        ...prevState,
        [category]: value,
      }
    })
  }

  const handleOpenConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(false)
  }

  const handleRemoveImage = () => {
    setCurrentProduct((prevState) => {
      const updatedImages = prevState.images.filter((_, index) => index !== currentImageIndex)

      return {
        ...prevState,
        images: updatedImages,
      }
    })

    setCurrentImageIndex((prevState) => (prevState > 0 ? prevState - 1 : 0))
  }

  useEffect(() => {
    const hasProductChanged = () => {
      if (
        currentProduct.name.en === "" ||
        currentProduct.name.ka === "" ||
        currentProduct.name.ru === "" ||
        currentProduct.description.en === "" ||
        currentProduct.description.ka === "" ||
        currentProduct.description.ru === ""
      ) {
        return false
      }

      return (
        product.name.en !== currentProduct.name.en ||
        product.name.ka !== currentProduct.name.ka ||
        product.name.ru !== currentProduct.name.ru ||
        product.description.en !== currentProduct.description.en ||
        product.description.ka !== currentProduct.description.ka ||
        product.description.ru !== currentProduct.description.ru ||
        product.inStock !== currentProduct.inStock ||
        product.price !== currentProduct.price ||
        product.fixedPrice !== currentProduct.fixedPrice ||
        product.images.length !== currentProduct.images.length ||
        product.images.some((image, index) => image !== currentProduct.images[index])
      )
    }

    setIsAbleToSave(hasProductChanged())
  }, [product, currentProduct])

  const renderImage = () => (
    <div className="product-image-wrapper">
      <div className="dashboard-product-image product-image">
        {currentProduct.images.length > 1 && (
          <>
            <button
              className="change-product-image next"
              onClick={() => handleSelectNextImage()}
            >
              <ArrowIcon className="next-arrow" />
            </button>
            <button
              className="change-product-image prev"
              onClick={() => handleSelectPrevImage()}
            >
              <ArrowIcon className="prev-arrow" />
            </button>
          </>
        )}
        <div className="image-options-buttons">
          <label className="button upload-button">
            <UploadIcon />
            <input
              className="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {/* <button
            className="button plus-button"
            onClick={() => handleAddEmptyImage()}
          >
            <PlusIcon />
          </button> */}
          <button
            onClick={handleRemoveImage}
            className="button trash-button"
          >
            <MinusIcon />
          </button>
        </div>
        <div className="product-options-buttons">
          <button
            className="button trash-button"
            onClick={handleOpenConfirmCloseModal}
          >
            <TrashIcon />
          </button>
          <button
            className="button save-button"
            disabled={!isAbleToSave}
            type="submit"
            // onClick={async () => {
            //   try {
            //     await onSave({
            //       ...currentProduct,
            //       id: currentProduct.id,
            //       token,
            //     })
            //     console.log("Product saved successfully.")
            //   } catch (error) {
            //     console.error("Error saving the product:", error)
            //   }
            // }}
            onClick={() => {
              onSave(currentProduct)
            }}
          >
            <CheckmarkIcon />
          </button>
        </div>
        {currentProduct.images[currentImageIndex] ? (
          <img
            src={currentProduct.images[currentImageIndex]}
            alt={""}
          />
        ) : (
          <div className="image-not-found-message">
            <p>Image not found</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderProductInformation = () => {
    const handleFocus = (e) => {
      const textarea = e.target
      const length = textarea.value.length
      textarea.setSelectionRange(length, length)
    }

    const renderName = () => {
      return activeFields.name ? (
        <input
          type="text"
          name="name"
          placeholder="name"
          autoFocus={true}
          className="product-name"
          onChange={handleInputChange}
          value={currentProduct.name[selectedLanguage]}
          onBlur={() => handleFieldEditFinish("name")}
          onFocus={handleFocus}
          required
        />
      ) : (
        <button
          onClick={() => handleFieldEditStart("name")}
          className="product-name field-button"
        >
          {currentProduct.name[selectedLanguage] || <p className="placeholder-text">name</p>}
        </button>
      )
    }

    const renderShortInformation = () => {
      return (
        <div className="product-short-information">
          <button
            onClick={() => {
              setCurrentProduct((prevState) => {
                setIsAbleToSave(!prevState.inStock !== product.inStock)

                return {
                  ...prevState,
                  inStock: !prevState.inStock,
                }
              })
            }}
            className={`product-status ${
              currentProduct.inStock ? "product-in-stock" : "product-not-in-stock"
            } field-button`}
          >
            {currentProduct.inStock ? "• in stock" : "• out of stock"}
          </button>
          <label
            className="fixed-price-label"
            htmlFor="fixedPrice"
          >
            <p>fixed price</p>
            <input
              type="checkbox"
              id="fixedPrice"
              name="fixedPrice"
              checked={currentProduct.fixedPrice}
              onChange={() => {
                setCurrentProduct((prevState) => {
                  setIsAbleToSave(
                    !prevState.fixedPrice !== product.fixedPrice ||
                      product.price !== currentProduct.price
                  )

                  return {
                    ...prevState,
                    fixedPrice: !prevState.fixedPrice,
                  }
                })
              }}
              required
            />
          </label>
          {!currentProduct.fixedPrice ? (
            ""
          ) : activeFields.price ? (
            <div className="product-price-wrapper">
              <input
                type="number"
                name="price"
                placeholder="price"
                autoFocus={true}
                className="dashboard-product-price product-price"
                onChange={handleInputChange}
                value={currentProduct.price}
                onBlur={() => handleFieldEditFinish("price")}
                required
              />
              $
            </div>
          ) : (
            <button
              className="field-button price-field-button"
              onClick={() => handleFieldEditStart("price")}
            >
              <div className="product-price">
                {currentProduct.price || <p className="placeholder-text">price</p>}
              </div>
              $
            </button>
          )}
        </div>
      )
    }

    const renderDescription = () => {
      return activeFields.description ? (
        <textarea
          ref={descriptionRef}
          name="description"
          placeholder="description"
          autoFocus={true}
          className="product-description"
          onChange={handleInputChange}
          value={currentProduct.description[selectedLanguage]}
          onBlur={() => handleFieldEditFinish("description")}
          required
        />
      ) : (
        <button
          onClick={() => handleFieldEditStart("description")}
          className="product-description field-button"
        >
          {currentProduct.description[selectedLanguage] ? (
            <p className="product-description-content">
              {currentProduct.description[selectedLanguage]}
            </p>
          ) : (
            <p className="placeholder-text">description</p>
          )}
        </button>
      )
    }

    const renderImageList = () => {
      return (
        currentProduct?.images?.length > 1 && (
          <ProductImageSelect
            images={currentProduct.images}
            handleSelectImage={handleSelectImage}
            currentIndex={currentImageIndex}
          />
        )
      )
    }

    const renderLanguageSelect = () => {
      return (
        <div className="language-select">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${selectedLanguage === language.code ? "language-selected" : ""}`}
              onClick={() => {
                setSelectedLanguage(language.code)
              }}
            >
              {language.name}
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className="product-information">
        {renderLanguageSelect()}
        {renderName()}
        {renderShortInformation()}
        {renderDescription()}
        {renderImageList()}
      </div>
    )
  }

  return (
    <div className="product-page">
      {isConfirmDeletionModalVisible ? (
        <ConfirmDeletionModal
          onClose={handleCloseConfirmCloseModal}
          message="are you sure you want to delete this product? this action cannot be undone."
        />
      ) : (
        ""
      )}
      <div className="product-container">
        {renderImage()}
        {renderProductInformation()}
      </div>
    </div>
  )
}

export default ProductEditPanel
