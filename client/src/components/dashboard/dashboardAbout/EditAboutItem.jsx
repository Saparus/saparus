import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useOnClickOutside } from "../../../hooks/useOnClickOutside"
import { editAboutItem } from "../../../services/ajax"

import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg"
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"

const EditAboutItem = ({
  aboutItem,
  handleChange,
  handleUnchange,
  currentLanguage,
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
        setCurrentItem((prevState) => {
          return {
            ...prevState,
            image: newImage,
          }
        })
      }
      reader.readAsDataURL(file)
    }

    handleUnchange()
  }

  const handleFieldEditStart = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }))
  }

  const handleFieldEditFinish = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }))

    if (JSON.stringify(currentItem) === JSON.stringify(aboutItem)) {
      handleUnchange()
    } else {
      handleChange()
    }
  }

  const { id, title, text, image } = currentItem

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
          placeholder="title"
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
            <h2 className="about-information-title">title</h2>
          )}
        </button>
      )
    }

    const renderText = () => {
      return activeFields.text ? (
        <textarea
          type="text"
          name="text"
          placeholder="text"
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
            <p className="about-information-text">text</p>
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
    setCurrentItem(aboutItem)
  }, [aboutItem])

  // not the best way to do it, will change latter
  // useEffect(() => {
  //   if (JSON.stringify(currentItem) === JSON.stringify(aboutItem)) {
  //     handleUnchange()
  //   } else {
  //     handleChange()
  //   }
  // }, [currentItem, aboutItem])

  return (
    <div
      ref={DashboardAboutItemRef}
      className="parts about-parts"
    >
      <div className="centered">
        <div className="about-item-options">
          <button
            onClick={handleAboutItemMoveUp}
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
            onClick={handleDeleteAboutItem}
            className="move-about-item remove"
          >
            <TrashIcon className="icon" />
          </button>
        </div>
        {renderItemInformation()}
        <div className="image">
          <img
            src={image}
            alt=""
          />
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
