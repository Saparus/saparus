import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { getEditProduct } from "../../../data/products"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg"
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg"
import { ReactComponent as CheckmarkIcon } from "../../../assets/icons/checkmark.svg"
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"

import ProductImageSelect from "../../product/ProductImageSelect"
import Loading from "../../other/Loading"

const DashboardProductEdit = ({ mode }) => {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isUploadPanelVisible, setIsUploadPanelVisible] = useState(false)
  const [isAbleToSave, setIsAbleToSave] = useState(false)

  const [activeFields, setActiveFields] = useState({
    name: false,
    description: false,
    inStock: false,
    price: false,
    fixedPrice: false,
    images: false,
  })

  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: {
      en: "",
      ka: "",
      ru: "",
    },
    fixedPrice: false,
    price: "",
    description: {
      en: "",
      ka: "",
      ru: "",
    },
    company: "",
    type: "",
    inStock: false,
    images: [],
  })

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["dashboard-product", id, currentLanguage], () => getEditProduct(id))

  const handleSelectNextImage = () => {
    setCurrentImageIndex((prevState) => {
      if (prevState + 1 >= currentProduct.images.length) return 0
      else return prevState + 1
    })
  }

  const handleSelectPrevImage = () => {
    setCurrentImageIndex((prevState) => {
      if (prevState - 1 < 0) return currentProduct.images.length - 1
      else return prevState - 1
    })
  }

  const handleSelectImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex)
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
      let newValue = value

      if (category === "price" && value[0] == 0) {
        newValue = value.slice(1)
      }

      if ((category === "price" && Number(value) <= 0) || !value) {
        newValue = 0
      }

      if (
        prevState[category] &&
        typeof prevState[category] === "object" &&
        currentLanguage in prevState[category]
      ) {
        return {
          ...prevState,
          [category]: {
            ...prevState[category],
            [currentLanguage]: newValue,
          },
        }
      } else {
        return {
          ...prevState,
          [category]: newValue,
        }
      }
    })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result // Data URL of the image
        setCurrentProduct((prevState) => ({
          ...prevState,
          images: [...prevState.images, newImage], // Add new image to the array
        }))
        setIsUploadPanelVisible(false)
        // Optionally, handle server upload here
      }
      reader.readAsDataURL(file) // Read file as data URL
    }
  }

  const handleAddEmptyImage = () => {
    setCurrentProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }))
  }

  const areProductsDifferent = (product1, product2) => {
    return JSON.stringify(product1) !== JSON.stringify(product2)
  }

  useEffect(() => {
    if (!product) return

    setCurrentProduct(product)
  }, [product])

  useEffect(() => {
    if (product && currentProduct) {
      const productsAreDifferent = areProductsDifferent(currentProduct, product)

      if (productsAreDifferent) {
        setIsAbleToSave(true)
      } else {
        setIsAbleToSave(false)
      }
    }
  }, [product, currentProduct])

  useEffect(() => {
    if (currentProduct) {
      localStorage.setItem(`product-${id}`, JSON.stringify(currentProduct))
    }
  }, [currentProduct, id])

  useEffect(() => {
    const savedProduct = localStorage.getItem(`product-${id}`)
    if (savedProduct) {
      const parsedProduct = JSON.parse(savedProduct)
      const defaultProduct = {
        id: "",
        name: {
          en: "",
          ka: "",
          ru: "",
        },
        fixedPrice: false,
        price: "",
        description: {
          en: "",
          ka: "",
          ru: "",
        },
        company: "",
        type: "",
        inStock: false,
        images: [],
      }

      // Check if savedProduct is different from the default product
      if (JSON.stringify(parsedProduct) !== JSON.stringify(defaultProduct)) {
        setCurrentProduct(parsedProduct)
      } else if (product) {
        setCurrentProduct(product)
      }
    } else if (product) {
      setCurrentProduct(product)
    }
  }, [product, id])

  const renderImage = () => {
    return (
      <div className="product-image-wrapper">
        <div className="dashboard-product-image product-image">
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
              onClick={handleAddEmptyImage}
            >
              <PlusIcon />
            </button>
            <button
              className="button trash-button"
              onClick={() => {
                console.log("clack")
              }}
            >
              <MinusIcon />
            </button>
          </div>

          <div className="product-options-buttons">
            <button
              className="button trash-button"
              disabled={!isAbleToSave}
            >
              <TrashIcon />
            </button>
            <button
              className="button save-button"
              disabled={!isAbleToSave}
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
  }

  const renderProductInformation = () => {
    return (
      <div className="product-information">
        {activeFields.name ? (
          <input
            // ref={nameFieldRef}
            type="text"
            name="name"
            autoFocus={true}
            className="product-name"
            onChange={handleInputChange}
            value={currentProduct.name[currentLanguage]}
            onBlur={() => handleFieldEditFinish("name")}
          />
        ) : (
          <button
            onClick={() => {
              handleFieldEditStart("name")
            }}
            className="product-name field-button"
          >
            {currentProduct.name[currentLanguage]}
          </button>
        )}
        <div className="product-short-information">
          <button
            onClick={() => {
              setCurrentProduct((prevState) => ({
                ...prevState,
                inStock: !prevState.inStock || false,
              }))
            }}
            className={`product-status ${
              currentProduct.inStock ? "product-in-stock" : "product-not-in-stock"
            } field-button`}
          >
            {currentProduct.inStock ? "• in stock" : "• out of stock"}
          </button>
          {activeFields.price ? (
            <div>
              <input
                type="number"
                name="price"
                autoFocus={true}
                className="dashboard-product-price product-price"
                onChange={handleInputChange}
                value={currentProduct.price}
                onBlur={() => handleFieldEditFinish("price")}
              />
              $
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  handleFieldEditStart("price")
                }}
                className="product-price field-button"
              >
                {currentProduct.price}
              </button>
              $
            </div>
          )}
        </div>
        {activeFields.description ? (
          <textarea
            // ref={descriptionFieldRef}
            type="text"
            name="description"
            autoFocus={true}
            className="product-description"
            onChange={handleInputChange}
            value={currentProduct.description[currentLanguage]}
            onBlur={() => handleFieldEditFinish("description")}
          />
        ) : (
          <button
            onClick={() => {
              handleFieldEditStart("description")
            }}
            className="product-description field-button"
          >
            {currentProduct.description[currentLanguage]}
          </button>
        )}
        {currentProduct?.images?.length > 1 ? (
          <ProductImageSelect
            images={currentProduct.images}
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
    if (error || !product || !currentProduct) return <div>something went wrong</div>

    return (
      <>
        {renderImage()}
        {renderProductInformation()}
      </>
    )
  }

  return (
    <div className="page product-page dashboard-product-page">
      <div className="product-container">{renderProduct()}</div>
    </div>
  )
}

export default DashboardProductEdit
