import { Link } from "react-router-dom"

const NewsItem = ({ title, text, url }) => {
  return (
    <Link
      className="news-item"
      to={url}
    >
      <h5 className="title">{title}</h5>
      <p
        className="description truncate"
        style={{ "--line-clamp": 8 }}
      >
        {text}
      </p>
    </Link>
  )
}

export default NewsItem
