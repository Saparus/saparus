import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg"

import ConfirmDeletionModal from "../ConfirmDeletionModal"

const EditAboutItem = ({
  aboutItem,
  handleChange,
  handleUnchange,
  currentLanguage,
  handleEditAboutItem,
  selectedLanguage,
  handleAboutItemMoveUp,
  handleAboutItemMoveDown,
  handleDeleteAboutItem,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "products" })

  const [activeFields, setActiveFields] = useState({
    title: false,
    text: false,
  })
  const [currentItem, setCurrentItem] = useState(structuredClone(aboutItem))
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)

  const DashboardAboutItemRef = useRef()

  const handleInputChange = (e) => {
    const { name: field, value } = e.target

    setCurrentItem((prevState) => {
      if (field === "title" || field === "text") {
        return {
          ...prevState,
          [field]: { ...prevState[field], [selectedLanguage]: value },
        }
      }

      return {
        ...prevState,
        [field]: value,
      }
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result

        setCurrentItem((prevState) => ({
          ...prevState,
          image: newImage,
        }))

        handleEditAboutItem(
          currentItem.id,
          currentItem.position,
          currentItem.title,
          currentItem.text,
          newImage || currentItem.image
        )

        handleChange()
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFieldEditStart = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }))
  }

  const handleFieldEditFinish = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }))

    if (JSON.stringify(currentItem[field]) !== JSON.stringify(aboutItem[field])) {
      handleChange()

      handleEditAboutItem(
        currentItem.id,
        currentItem.position,
        currentItem.title,
        currentItem.text,
        currentItem.image
      )
    }
  }

  const handleOpenConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(false)
  }

  const { title, text, image } = currentItem

  const renderItemInformation = () => {
    const handleFocus = (e) => {
      const textarea = e.target
      const length = textarea.value.length
      textarea.setSelectionRange(length, length)
    }

    const renderTitle = () => {
      return activeFields.title ? (
        <input
          type="text"
          name="title"
          placeholder={t("title")}
          autoFocus={true}
          className="about-information-title"
          onChange={handleInputChange}
          value={title[selectedLanguage]}
          onBlur={() => handleFieldEditFinish("title")}
          onFocus={handleFocus}
          required
        />
      ) : (
        <button
          className="field-button"
          onClick={() => handleFieldEditStart("title")}
        >
          {title[selectedLanguage] ? (
            <h2 className="about-information-title">{title[selectedLanguage]}</h2>
          ) : (
            <h2 className="about-information-title">{t("title")}</h2>
          )}
        </button>
      )
    }

    const renderText = () => {
      return activeFields.text ? (
        <textarea
          type="text"
          name="text"
          placeholder={t("text")}
          autoFocus={true}
          className="about-information-text"
          onChange={handleInputChange}
          value={text[selectedLanguage]}
          onBlur={() => handleFieldEditFinish("text")}
          onFocus={handleFocus}
          required
        />
      ) : (
        <button
          className="field-button"
          onClick={() => handleFieldEditStart("text")}
        >
          {text[selectedLanguage] ? (
            <p className="about-information-text">{text[selectedLanguage]}</p>
          ) : (
            <p className="about-information-text">{t("text")}</p>
          )}
        </button>
      )
    }

    return (
      <div className="information">
        {renderTitle()}
        {renderText()}
      </div>
    )
  }

  useEffect(() => {
    setCurrentItem(structuredClone(aboutItem))
  }, [aboutItem])

  return (
    <div
      ref={DashboardAboutItemRef}
      className="parts about-parts"
    >
      <div className="centered">
        <div className="about-item-options">
          <button
            onClick={handleAboutItemMoveUp}
            disabled={aboutItem.position === 0}
            className="move-about-item move-up"
          >
            <ArrowIcon className="icon" />
          </button>
          <button
            onClick={handleAboutItemMoveDown}
            className="move-about-item move-down"
          >
            <ArrowIcon className="icon" />
          </button>

          <button
            onClick={handleOpenConfirmCloseModal}
            className="move-about-item remove"
          >
            <TrashIcon className="icon" />
          </button>
        </div>
        {renderItemInformation()}
        {isConfirmDeletionModalVisible ? (
          <ConfirmDeletionModal
            onClose={handleCloseConfirmCloseModal}
            message={t("are you sure you want to delete this? this action cannot be undone.")}
            deleteItem={handleDeleteAboutItem}
          />
        ) : (
          ""
        )}
        <div
          className="image"
          style={{
            "--no-image-text": `"${t("no image")}\\A${t("click here to upload")}"`,
          }}
        >
          <img
            src={image}
            alt=""
          />
          <UploadIcon className="icon upload-icon" />
          <div className="image-panel"></div>
          <input
            className="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    </div>
  )
}

export default EditAboutItem
