import { useState } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { getNewsArticles } from "../../services/newsServices"

import NewsArticle from "./NewsArticle"
import Loading from "../other/Loading"
import PageSelect from "../catalog/PageSelect"

const NewsList = () => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery(["news", currentLanguage, limit, page], () =>
    getNewsArticles(currentLanguage, limit, page)
  )

  if (isLoading) return <Loading />
  if (error || !data) {
    console.log(error)
    return <div>{t("something went wrong")}</div>
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage })
    scrollToTop()
  }

  const renderNewsArticles = () => {
    if (isLoading) return <Loading />
    if (error || !data) return <div>{t("something went wrong")}</div>

    const { articles, pagination } = data

    if (articles?.length === 0) {
      return <p>{t("no news")}</p>
    } else {
      return (
        <>
          <div className="news-article-list">
            {articles.map((article, index) => (
              <NewsArticle
                key={index}
                title={article.title}
                text={article.text}
                date={new Date(article.date).toLocaleDateString()}
                image={article.images?.[0]}
                id={article.id}
                type="news"
              />
            ))}
          </div>

          <PageSelect
            currentPage={pagination.currentPage}
            totalPages={pagination?.totalPages || 1}
            maximumPages={10}
            goToPage={goToPage}
          />
        </>
      )
    }
  }

  return <div className="news-articles">{renderNewsArticles()}</div>
}

export default NewsList
