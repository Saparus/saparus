import { useState, useRef, useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg"
import { ReactComponent as MinusIcon } from "../../../assets/icons/minus.svg"
import { ReactComponent as CheckmarkIcon } from "../../../assets/icons/checkmark.svg"
import { deleteNewsArticle } from "../../../services/newsServices"

import Loading from "../../other/Loading"
import ConfirmDeletionModal from "../ConfirmDeletionModal.jsx"
import LanguageSelect from "../LanguageSelect.jsx"

const EditNewsArticlePanel = ({ article, onSave, token }) => {
  const navigate = useNavigate()
  // const { title, text, date, images } = article

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  const { id } = useParams()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const textRef = useRef(null)

  const currentDate = new Date()

  const queryClient = useQueryClient()

  const [currentArticle, setCurrentArticle] = useState(structuredClone(article))
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage.split("-")[0])
  const [isConfirmDeletionModalVisible, setIsConfirmDeletionModalVisible] = useState(false)
  const [isAbleToSave, setIsAbleToSave] = useState(false)
  const [activeFields, setActiveFields] = useState({
    title: false,
    text: false,
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteNewsArticle(id, token),
    onSuccess: () => {
      toast.success("Successfully deleted news article")
      queryClient.invalidateQueries(["news", token]) // this will cause refetching
      navigate("../../admin/news")
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(
        "Something went wrong while deleting news article, check browser console for more detailed explanation"
      )
    },
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result
        setCurrentArticle((prevState) => {
          const updatedImages = [...prevState.images, newImage]

          return {
            ...prevState,
            images: [...prevState.images, newImage],
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageDelete = (index) => {
    setCurrentArticle((prevState) => {
      return {
        ...prevState,
        images: prevState.images?.filter((image, imageIndex) => imageIndex !== index),
      }
    })
  }

  const handleOpenConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(true)
  }

  const handleCloseConfirmCloseModal = () => {
    setIsConfirmDeletionModalVisible(false)
  }

  const handleFieldEditStart = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: true }))
  }

  const handleFieldEditFinish = (field) => {
    setActiveFields((prevState) => ({ ...prevState, [field]: false }))
  }

  const handleInputChange = (e) => {
    const { name: category, value } = e.target

    setCurrentArticle((prevState) => {
      if (category === "title" || category === "text") {
        return {
          ...prevState,
          [category]: { ...prevState[category], [selectedLanguage]: value },
        }
      }

      return {
        ...prevState,
        [category]: value,
      }
    })
  }

  const renderImages = (images) => {
    return (
      <div className="news-images">
        {images.map((image, index) => (
          <div
            className="image"
            key={index}
          >
            <img
              src={image}
              alt=""
            />
            <button
              className="delete-button"
              onClick={() => handleImageDelete(index)}
            >
              <MinusIcon />
            </button>
          </div>
        ))}
      </div>
    )
  }

  const handleFocus = (e) => {
    const textarea = e.target
    const length = textarea.value.length
    textarea.setSelectionRange(length, length)
  }

  const renderTitle = () => {
    return activeFields?.title ? (
      <input
        type="text"
        name="title"
        placeholder="title"
        autoFocus={true}
        className="article-title"
        onChange={handleInputChange}
        value={currentArticle.title[selectedLanguage]}
        onBlur={() => handleFieldEditFinish("title")}
        onFocus={handleFocus}
        required
      />
    ) : (
      <button
        onClick={() => handleFieldEditStart("title")}
        className="article-title field-button"
      >
        {currentArticle.title[selectedLanguage] || <p className="placeholder-text">title</p>}
      </button>
    )
  }

  const renderText = () => {
    return activeFields.text ? (
      <textarea
        ref={textRef}
        name="text"
        placeholder="text"
        autoFocus={true}
        className="article-text"
        onChange={handleInputChange}
        value={currentArticle.text[selectedLanguage]}
        onBlur={() => handleFieldEditFinish("text")}
        required
      />
    ) : (
      <button
        onClick={() => handleFieldEditStart("text")}
        className="article-text field-button"
      >
        {currentArticle.text[selectedLanguage] ? (
          <p className="article-text-content">{currentArticle.text[selectedLanguage]}</p>
        ) : (
          <p className="placeholder-text">text</p>
        )}
      </button>
    )
  }

  const renderDate = () => {
    if (currentArticle.date) {
      return new Date(currentArticle?.date).toLocaleDateString()
    } else {
      return new Date().toLocaleDateString()
    }
  }

  const renderArticle = () => {
    return (
      <div className="edit-article">
        <div className="title-div">
          {renderTitle()}
          <p className="date">
            {renderDate()} {t("Editing")}
          </p>
        </div>
        {renderText()}
        {renderImages(currentArticle.images)}
        <div className="image-upload">
          <div className="upload-image-text">{t("Upload image")}</div>
          <input
            className="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page edit-news-article-page">
      {isConfirmDeletionModalVisible ? (
        <ConfirmDeletionModal
          onClose={handleCloseConfirmCloseModal}
          message={t("are you sure you want to delete this product? this action cannot be undone.")}
          deleteItem={deleteMutation.mutate}
        />
      ) : (
        ""
      )}
      <div className="article-buttons">
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <button
          onClick={onSave}
          className="confirm-button"
        >
          <CheckmarkIcon />
        </button>
        <button
          onClick={handleOpenConfirmCloseModal}
          className="delete-button"
        >
          <TrashIcon />
        </button>
      </div>

      {renderArticle()}
    </div>
  )
}

export default EditNewsArticlePanel
