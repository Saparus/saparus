import { Link } from "react-router-dom"

const NewsArticle = ({ title, text, date, image, to }) => {
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
      to={to}
      className="news-article"
    >
      <div className="news-title">
        <h5 className="title">{title}</h5>
        <p className="date">{date}</p>
      </div>
      <p
        className="text truncate"
        style={{ "--line-clamp": 7 }}
      >
        {text}
      </p>
      {renderImage()}
    </Link>
  )
}

export default NewsArticle
