import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"

import DashboardNewsList from "./DashboardNewsList"

const DashboardNews = () => {
  const { token } = useOutletContext()

  return (
    <div className="page dashboard-news-page">
      <div className="dashboard-news-buttons">
        <Link
          to="../../admin/news/add"
          className="add-new-article-button"
        >
          Add New Article
        </Link>
      </div>

      <DashboardNewsList token={token} />
    </div>
  )
}

export default DashboardNews
