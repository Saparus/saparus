import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

import { getAllNews } from "../../data/news"
import formatDate from "../../utils/formatDate"

import Loading from "../other/Loading"
import NewsItem from "./NewsItem"

const HomePageNews = () => {
  const { t } = useTranslation("translation", { keyPrefix: "time" })
  const { i18n } = useTranslation()

  const languages = ["en", "ka", "ru"]

  const currentLanguage = languages.includes(i18n.language) ? i18n.language : "en"

  const {
    data: news,
    isLoading,
    error,
  } = useQuery(["news", currentLanguage], () => getAllNews(currentLanguage))

  if (isLoading) return <Loading />
  if (error) return <div>Error fetching news</div>

  const renderLatestNews = () => {
    return (
      <Link
        to="/news/0"
        className="latest-news"
      >
        <div className="image">
          {news[0].image ? (
            <img
              src={news[0].image}
              alt={news[0].title}
            />
          ) : (
            <div className="no-image-image"></div>
          )}
          <div className="shadow-holder"></div>
          <div className="latest-news-information">
            <div className="latest-news-title">
              <h4 className="title">{news[0].title}</h4>
              <p className="date">{formatDate(t, news[0].date)}</p>
            </div>
            <p
              className="description truncate"
              style={{ "--line-clamp": 3 }}
            >
              {news[0].text}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className="home-page-news">
      <h2>News</h2>
      <div className="news">
        {renderLatestNews()}
        <div className="news-list">
          {news.slice(1, 4).map((newsItem) => (
            <NewsItem
              key={newsItem.id}
              title={newsItem.title}
              text={newsItem.text}
              date={formatDate(t, newsItem.date)}
              url={`/news/${newsItem.id}`}
            />
          ))}
        </div>
        {news.length >= 5 ? (
          <Link
            className="view-more-news-link"
            to="news"
          >
            View More
          </Link>
        ) : (
          ""
        )}
      </div>
    </section>
  )
}

export default HomePageNews
