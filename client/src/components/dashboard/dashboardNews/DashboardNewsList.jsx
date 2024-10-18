import { useState } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { getEditNewsArticles } from "../../../services/newsServices"

import NewsArticleEdit from "./NewsArticleEdit"
import Loading from "../../other/Loading"
import PageSelect from "../../catalog/PageSelect"
import LanguageSelect from "../LanguageSelect"

const DashboardNewsList = ({ token }) => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery(["news", limit, page, token], () =>
    getEditNewsArticles(limit, page, token)
  )

  if (isLoading) return <Loading />
  if (error || !data) {
    console.log(error)
    return <div>something went wrong</div>
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
    if (error || !data) return <div>Something went wrong</div>

    const { articles, pagination } = data

    if (articles?.length === 0) {
      return <p>no news</p>
    } else {
      return (
        <>
          <div className="news-article-list">
            {articles.map((article, index) => (
              <NewsArticleEdit
                key={index}
                title={article.title}
                text={article.text}
                currentLanguage={currentLanguage}
                date={new Date(article.date).toLocaleDateString()}
                image={article.images?.[0]}
                id={article.id}
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

export default DashboardNewsList
