import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useMutation, useQueryClient } from "react-query"
import { useOutletContext, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as ResetIcon } from "../../../assets/icons/spinning-arrow.svg"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg"
import { ReactComponent as CheckmarkIcon } from "../../../assets/icons/checkmark.svg"
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"

import { deleteProduct } from "../../../services/productServices"

import ProductImageSelect from "../../product/ProductImageSelect"
import ConfirmDeletionModal from "../ConfirmDeletionModal"
import LanguageSelect from "../LanguageSelect"
import EditCategoryList from "./EditCategoryList"

const ProductEditPanel = ({ product, onSave }) => {
  const navigate = useNavigate()

  const { apiKey } = useOutletContext()

  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const { t } = useTranslation("translation", { keyPrefix: "products" })

  const queryClient = useQueryClient()

  const descriptionRef = useRef(null)

  const [currentProduct, setCurrentProduct] = useState(structuredClone(product))
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)
  const [newCategory, setNewCategory] = useState({ key: "", value: "" })
  const [isAbleToSave, setIsAbleToSave] = useState(false)

  const [activeFields, setActiveFields] = useState({
    name: false,
    description: false,
    inStock: false,
    price: false,
    fixedPrice: false,
    images: false,
    categories: false,
  })

  const handleSelectImage = (imageIndex) => {
    setCurrentImageIndex(imageIndex)
  }

  const handleSelectNextImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState + 1 >= currentProduct.images?.length ? 0 : prevState + 1
    )
  }

  const handleSelectPrevImage = () => {
    setCurrentImageIndex((prevState) =>
      prevState - 1 < 0 ? currentProduct.images?.length - 1 : prevState - 1
    )
  }

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

  const handleReset = () => {
    setCurrentProduct(structuredClone(product))
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

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteProduct(id, apiKey)
    },
    onMutate: () => {
      toast.loading("Deleting product...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Successfully deleted product")

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("products"),
      })

      navigate("../../admin/products")
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || error.message || "Something went wrong"

      toast.dismiss()
      console.log(errorMessage)
      toast.error(errorMessage)
    },
  })

  useEffect(() => {
    // fix latter, don't forget
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
        JSON.stringify(product.categories) !== JSON.stringify(currentProduct.categories) ||
        product.name.en !== currentProduct.name.en ||
        product.name.ka !== currentProduct.name.ka ||
        product.name.ru !== currentProduct.name.ru ||
        product.description.en !== currentProduct.description.en ||
        product.description.ka !== currentProduct.description.ka ||
        product.description.ru !== currentProduct.description.ru ||
        product.inStock !== currentProduct.inStock ||
        product.price !== currentProduct.price ||
        product.fixedPrice !== currentProduct.fixedPrice ||
        product.images?.length !== currentProduct.images?.length ||
        product.images?.some((image, index) => image !== currentProduct.images?.[index])
      )
    }

    setIsAbleToSave(hasProductChanged())
  }, [product, currentProduct, currentProduct.categories])

  const renderImage = () => (
    <div className="product-image-wrapper">
      <div className="dashboard-product-image product-image">
        {currentProduct.images?.length > 1 && (
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
            className="button reset-button"
            onClick={handleReset}
          >
            <ResetIcon />
          </button>
          <button
            className="button save-button"
            disabled={!isAbleToSave}
            type="submit"
            onClick={() => {
              onSave(currentProduct)
            }}
          >
            <CheckmarkIcon />
          </button>
        </div>
        {currentProduct.images?.[currentImageIndex] ? (
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
          placeholder={t("name")}
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
          {currentProduct.name[selectedLanguage] || <p className="placeholder-text">{t("name")}</p>}
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
            {currentProduct.inStock ? t("• in stock") : t("• out of stock")}
          </button>
          <label
            className="fixed-price-label"
            htmlFor="fixedPrice"
          >
            <p>{t("fixed price")}</p>
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
                placeholder={t("price")}
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
                {currentProduct.price || <p className="placeholder-text">{t("price")}</p>}
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
          placeholder={t("description")}
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
            <p className="placeholder-text">{t("description")}</p>
          )}
        </button>
      )
    }

    const renderCategories = () => {
      const { categories } = currentProduct

      const categoryArray = Object.entries(categories).map(([key, value]) => ({ key, value }))

      return (
        <EditCategoryList
          categories={categoryArray}
          isActive={activeFields.categories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          setCurrentProduct={setCurrentProduct}
          handleFieldEditStart={handleFieldEditStart}
          handleFieldEditFinish={handleFieldEditFinish}
        />
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

    //

    return (
      <div className="product-information">
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        {renderName()}
        {renderShortInformation()}
        {renderDescription()}
        {renderCategories()}
        {renderImageList()}
      </div>
    )
  }

  return (
    <div className="product-page">
      {isConfirmDeletionModalVisible ? (
        <ConfirmDeletionModal
          onClose={handleCloseConfirmCloseModal}
          deleteItem={() => {
            deleteProductMutation.mutate(product.id)
          }}
          message={t("are you sure you want to delete this product? this action cannot be undone.")}
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
