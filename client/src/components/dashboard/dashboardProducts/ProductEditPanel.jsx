import { useState, useEffect } from "react"
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

const ProductEditPanel = ({ product, onSave }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [currentProduct, setCurrentProduct] = useState(structuredClone(product))
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

  const handleAddEmptyImage = () => {
    setCurrentProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        setCurrentProduct((prevState) => ({
          ...prevState,
          images: [...prevState.images, newImage],
        }))
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

  const handleInputChange = (event) => {
    const { name: category, value } = event.target

    setCurrentProduct((prevState) => {
      if (category === "name" || category === "description") {
        // if (
        //   Object.values(product.name).some(
        //     (languageValue) => languageValue === value || languageValue === ""
        //   ) ||
        //   Object.values(product.description).some(
        //     (languageValue) => languageValue === value || languageValue === ""
        //   )
        // )

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
          value === ""
        ) {
          setIsAbleToSave(false)
        } else {
          setIsAbleToSave(true)
        }

        return {
          ...prevState,
          [category]: { ...prevState[category], [currentLanguage]: value },
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
        return {
          ...prevState,
          [category]: value.slice(1),
          fixedPrice: value.slice(1) !== 0,
        }
      }

      if (category === "price") {
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
    console.log("Open confirm deletion modal")

    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(false)
  }

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
          <button
            className="button plus-button"
            onClick={() => handleAddEmptyImage()}
          >
            <PlusIcon />
          </button>
          <button className="button trash-button">
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
            onClick={() => {
              onSave(
                currentProduct.name,
                currentProduct.images,
                currentProduct.inStock,
                currentProduct.fixedPrice,
                currentProduct.price,
                currentProduct.id
              )
            }}
          >
            <CheckmarkIcon />
          </button>
        </div>
        {currentProduct?.images[0] ? (
          <img
            src={currentProduct.images[currentImageIndex]}
            alt={currentProduct.name[currentLanguage]}
          />
        ) : (
          <div className="image-not-found-message">Image not found</div>
        )}
      </div>
    </div>
  )

  const renderProductInformation = () => {
    const renderName = () => {
      return activeFields.name ? (
        <input
          type="text"
          name="name"
          placeholder="name"
          autoFocus={true}
          className="product-name"
          onChange={handleInputChange}
          value={currentProduct.name[currentLanguage]}
          onBlur={() => handleFieldEditFinish("name")}
          required
        />
      ) : (
        <button
          onClick={() => handleFieldEditStart("name")}
          className="product-name field-button"
        >
          {currentProduct.name[currentLanguage] || <p className="placeholder-text">name</p>}
        </button>
      )
    }

    const renderShortInformation = () => {
      return (
        <div className="product-short-information">
          <button
            onClick={() => {
              setCurrentProduct((prevState) => ({
                ...prevState,
                inStock: !prevState.inStock,
              }))
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
                setCurrentProduct((prevState) => ({
                  ...prevState,
                  fixedPrice: !prevState.fixedPrice,
                }))
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
          name="description"
          placeholder="description"
          autoFocus={true}
          className="product-description"
          onChange={handleInputChange}
          value={currentProduct.description[currentLanguage]}
          onBlur={() => handleFieldEditFinish("description")}
          required
        />
      ) : (
        <button
          onClick={() => handleFieldEditStart("description")}
          className="product-description field-button"
        >
          {currentProduct.description[currentLanguage] || (
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

    return (
      <div className="product-information">
        {renderName()}
        {renderShortInformation()}
        {renderDescription()}
        {renderImageList()}
      </div>
    )
  }

  // console.log(currentProduct.name.en)

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
