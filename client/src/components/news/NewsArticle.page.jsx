import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { getSingleNewsArticle } from "../../services/newsServices"

import Loading from "../other/Loading"

const NewsArticle = () => {
  const { id } = useParams()
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const { data, isLoading, error } = useQuery(["news-article", id], () =>
    getSingleNewsArticle(id, currentLanguage)
  )

  const renderImages = (images) => {
    return (
      <div className="news-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
          />
        ))}
      </div>
    )
  }

  const renderArticle = () => {
    if (isLoading) return <Loading />

    if (error || !data) return <div>something went wrong</div>

    return (
      <div>
        <div className="title-div">
          <h1 className="title">{data.title}</h1>
          <p className="date">{new Date(data.date).toLocaleDateString()}</p>
        </div>

        <p className="text">{data.text}</p>
        {renderImages(data.images)}
      </div>
    )
  }

  return <div className="page news-article-page">{renderArticle()}</div>
}

export default NewsArticle