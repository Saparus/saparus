import { useState } from "react"
import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { getEditNewsArticles } from "../../../services/newsServices"
import { getEditChildrenProgramArticles } from "../../../services/childrenProgramServices"

import NewsArticleEdit from "./NewsArticleEdit"
import Loading from "../../other/Loading"
import PageSelect from "../../catalog/PageSelect"

const DashboardNewsList = ({ apiKey, type = "news" }) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  const [limit] = useState(20)

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const { data, isLoading, error } = useQuery([limit, page, apiKey, type], () =>
    type === "news"
      ? getEditNewsArticles(limit, page, apiKey)
      : getEditChildrenProgramArticles(limit, page, apiKey)
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
      return (
        <p className="no-items-message">
          {t("no items, create new ones by pressing the button above")}
        </p>
      )
    } else {
      return (
        <>
          <div className="news-article-list">
            {articles?.map((article, index) => (
              <NewsArticleEdit
                key={index}
                type={type === "children program" ? "children" : type}
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
