import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

import { getNewsArticles } from "../../services/newsServices"

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
  } = useQuery(["news", currentLanguage], () => getNewsArticles(currentLanguage, 4, 1))

  if (isLoading) return <Loading />
  if (error) return <div>Error fetching news</div>

  const renderLatestNews = () => {
    if (!news?.articles?.length) return <div>No news articles</div>

    return (
      <Link
        to="/news/0"
        className="latest-news"
      >
        <div className={`image ${news.articles[0].images?.[0] ? "" : "no-image"}`}>
          {news?.articles[0]?.images ? (
            <img
              src={news.articles[0].images?.[0]}
              // alt={news.articles[0].title}
            />
          ) : (
            <div className="no-image-image"></div>
          )}
          <div className="shadow-holder"></div>
          <div className="latest-news-information">
            <div className="latest-news-title">
              <h4 className="title">{news.articles[0].title}</h4>
              <p className="date">{new Date(news.articles[0].date).toLocaleDateString()}</p>
            </div>
            <p
              className="description truncate"
              style={{ "--line-clamp": 3 }}
            >
              {news.articles[0].text}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  const renderNews = () => {
    if (!news?.articles?.length) return

    return news?.articles.slice(1, 4).map((newsItem) => (
      <NewsItem
        key={newsItem.id}
        title={newsItem.title}
        text={newsItem.text}
        date={new Date(newsItem.date).toLocaleDateString()}
        url={`/news/${newsItem.id}`}
      />
    ))
  }

  return (
    <section className="home-page-news">
      {news?.articles?.length ? <h2>News</h2> : ""}
      <div className="news">
        {renderLatestNews()}
        <div className="news-list">{renderNews()}</div>
        {news?.pagination.hasNextPage ? (
          <Link
            className="view-more-news-link"
            to="news"
          >
            {t("View All News Articles")}
          </Link>
        ) : (
          ""
        )}
      </div>
    </section>
  )
}

export default HomePageNews
