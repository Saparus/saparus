import { useState } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { getChildrenProgramArticles } from "../../services/childrenProgramServices"

import NewsArticle from "../news/NewsArticle"
import Loading from "../other/Loading"
import PageSelect from "../catalog/PageSelect"

const ChildrenProgramArticleList = () => {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const { t } = useTranslation("translation", { keyPrefix: "children program" })

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery(
    ["children program", currentLanguage, limit, page],
    () => getChildrenProgramArticles(currentLanguage, limit, page)
  )

  if (isLoading) return <Loading />

  if (error || !data) {
    console.log(error)
    return <div>{t("Something went wrong")}</div>
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
    if (error || !data) return <div>{t("Something went wrong")}</div>

    const { articles, pagination } = data

    if (articles?.length === 0) {
      return <p>{t("no children programs")}</p>
    } else {
      return (
        <>
          <div className="news-article-list">
            {articles?.map((article, index) => (
              <NewsArticle
                key={index}
                title={article.title}
                text={article.text}
                date={new Date(article.date).toLocaleDateString()}
                image={article.images?.[0]}
                to={`../news/${article.id}`}
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

export default ChildrenProgramArticleList
