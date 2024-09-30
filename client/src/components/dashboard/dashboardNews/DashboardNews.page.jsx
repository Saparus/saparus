import { useOutletContext } from "react-router-dom"

import NewsEdit from "./NewsEdit"
import NewsArticle from "../../news/NewsArticle"
import NewsList from "../../news/NewsList"

const DashboardNews = () => {
  const { token } = useOutletContext()

  return <div>DashboardNews</div>
}

export default DashboardNews
