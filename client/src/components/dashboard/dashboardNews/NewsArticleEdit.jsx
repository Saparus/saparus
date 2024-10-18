import { Link } from "react-router-dom"

const NewsArticleEdit = ({ title, text, date, image, id, currentLanguage }) => {
  const renderImage = () => {
    if (image?.length < 1) return

    return (
      <div className="news-images-wrapper">
        <img
          className="news-image"
          src={image}
          alt=""
        />
      </div>
    )
  }

  return (
    <Link
      to={`../news/${id}`}
      className="news-article"
    >
      <div className="news-title">
        <h5 className="title">{title[currentLanguage]}</h5>
        <p className="date">{date}</p>
      </div>
      <p
        className="text truncate"
        style={{ "--line-clamp": 7 }}
      >
        {text[currentLanguage]}
      </p>
      {renderImage()}
    </Link>
  )
}

export default NewsArticleEdit
