import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"

import ConfirmDeletionModal from "../ConfirmDeletionModal"

const EditProductLink = ({ product, handleDelete }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const handleOnHover = () => {
    if (isConfirmDeletionModalVisible) return

    setIsHovering(true)
  }

  const handleOnBlur = () => {
    setIsHovering(false)
  }

  const handleOpenConfirmCloseModal = (e) => {
    e?.preventDefault()

    setIsHovering(false)
    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = (e) => {
    e?.preventDefault()

    setIsHovering(false)
    setIsConfirmDeletionModalVisible(false)
  }

  return (
    <Link
      to={`./edit/${product.id}`}
      className="dashboard-product product"
      onMouseEnter={handleOnHover}
      onMouseLeave={handleOnBlur}
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
            {product.inStock ? t("• in stock") : t("• out of stock")}
          </p>
        </div>
      </div>
      {isHovering ? (
        <button
          className="trash-icon-button"
          onClick={handleOpenConfirmCloseModal}
        >
          <TrashIcon />
        </button>
      ) : (
        ""
      )}
      <div className="product-shop">
        <div className="shop">
          <p>{product.fixedPrice ? product.price + "$" : t("Price on Request")}</p>
        </div>
      </div>
      {isConfirmDeletionModalVisible ? (
        <ConfirmDeletionModal
          deleteItem={handleDelete}
          onClose={handleCloseConfirmCloseModal}
          message={t("are you sure you want to delete this product? this action cannot be undone.")}
        />
      ) : (
        ""
      )}
    </Link>
  )
}

export default EditProductLink
