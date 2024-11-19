import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"

import DashboardNewsList from "../dashboardNews/DashboardNewsList"

const DashboardChildrenProgramArticles = () => {
  const { token } = useOutletContext()

  return (
    <div className="page dashboard-news-page">
      <div className="dashboard-news-buttons">
        <Link
          to="../../admin/news/add"
          className="add-new-article-button"
        >
          Add New Child Program Article
        </Link>
      </div>

      <DashboardNewsList
        token={token}
        type="children program"
      />
    </div>
  )
}

export default DashboardChildrenProgramArticles
