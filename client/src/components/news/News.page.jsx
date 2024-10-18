import { useQuery } from "react-query"
import { useTranslation } from "react-i18next"

import { getNewsArticles } from "../../services/newsServices"

import Loading from "../other/Loading"
import NewsList from "./NewsList"

const NewsPage = () => {
  return (
    <div className="page news-page">
      <NewsList />
    </div>
  )
}

export default NewsPage
