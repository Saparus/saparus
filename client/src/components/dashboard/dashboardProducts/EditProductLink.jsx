import { useState } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { deleteProduct } from "../../../services/ajax"

import ConfirmDeletionModal from "../ConfirmDeletionModal"

const EditProductLink = ({ product }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)

  const handleOnHover = () => {
    if (isConfirmDeletionModalVisible) return

    setIsHovering(true)
  }

  const handleOnBlur = () => {
    setIsHovering(false)
  }

  const handleOpenConfirmCloseModal = (e) => {
    e.preventDefault()

    setIsHovering(false)
    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = (e) => {
    e.preventDefault()

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
            {product.inStock ? "• in stock" : "• out of stock"}
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
          <p>{product.fixedPrice ? product.price + "$" : "Price on Request"}</p>
        </div>
      </div>
      {isConfirmDeletionModalVisible ? (
        <ConfirmDeletionModal
          onClose={handleCloseConfirmCloseModal}
          message="are you sure you want to delete this product? this action cannot be undone."
        />
      ) : (
        ""
      )}
    </Link>
  )
}

export default EditProductLink
