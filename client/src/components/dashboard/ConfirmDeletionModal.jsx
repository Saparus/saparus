import { useTranslation } from "react-i18next"
import { useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

const ConfirmDeletionModal = ({ deleteItem, message, onClose, isVisible }) => {
  const modalRef = useRef(null)
  const portalRoot = document.querySelector(".app")

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isVisible])

  if (!portalRoot) return null

  return createPortal(
    <div className="confirm-deletion-modal-wrapper">
      <div
        className="confirm-deletion-modal"
        ref={modalRef}
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <div className="confirm-deletion-modal-content">
          <div className="message">{message}</div>
          <div className="buttons">
            <button
              className="delete-button"
              onClick={() => {
                deleteItem()
                onClose()
              }}
            >
              {t("confirm")}
            </button>
            <button
              className="discard-button"
              onClick={onClose}
            >
              {t("discard")}
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  )
}

export default ConfirmDeletionModal
