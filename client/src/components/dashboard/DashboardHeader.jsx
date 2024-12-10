import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const DashboardHeader = ({ name, handleLogOut }) => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  return (
    <div className={`dashboard-header`}>
      <h3>{t("Admin Dashboard")}</h3>
      {/* - <p>{name}</p> */}
      <div className="dashboard-navigation-buttons">
        <NavLink to="news">{t("News")}</NavLink>
        <NavLink to="about">{t("About")}</NavLink>
        <NavLink to="products">{t("Products")}</NavLink>
        <NavLink to="children">{t("Child Program")}</NavLink>
        <button onClick={handleLogOut}>{t("log out")}</button>
      </div>
    </div>
  )
}

export default DashboardHeader
