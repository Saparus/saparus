import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import DashboardNewsList from "./DashboardNewsList"

const DashboardNews = () => {
  const { token } = useOutletContext()

  const { t } = useTranslation("translation", { keyPrefix: "news" })

  return (
    <div className="page dashboard-news-page">
      <div className="dashboard-news-buttons">
        <Link
          to="../../admin/news/add"
          className="add-new-article-button"
        >
          {t("Add New Article")}
        </Link>
      </div>

      <DashboardNewsList token={token} />
    </div>
  )
}

export default DashboardNews
