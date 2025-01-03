import { Link } from "react-router-dom"

const NewsItem = ({ title, text, url, date, className }) => {
  return (
    <Link
      className={`news-item ${className}`}
      to={url}
    >
      <div className="news-title">
        <h5 className="title">{title}</h5>
        <p className="date">{date}</p>
      </div>
      <p
        className="description truncate"
        style={{ "--line-clamp": 7 }}
      >
        {text}
      </p>
    </Link>
  )
}

export default NewsItem
