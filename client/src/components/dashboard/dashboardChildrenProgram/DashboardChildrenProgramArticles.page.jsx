import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import DashboardNewsList from "../dashboardNews/DashboardNewsList"

const DashboardChildrenProgramArticles = () => {
  const { apiKey } = useOutletContext()

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  return (
    <div className="page dashboard-news-page">
      <div className="dashboard-news-buttons">
        <Link
          to="../../admin/children/add"
          className="add-new-article-button"
        >
          {t("Add New Child Program Article")}
        </Link>
      </div>

      <DashboardNewsList
        apiKey={apiKey}
        type="children"
      />
    </div>
  )
}

export default DashboardChildrenProgramArticles
