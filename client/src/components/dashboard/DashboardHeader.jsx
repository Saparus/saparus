import { useTranslation } from "react-i18next"
import { NavLink, Link } from "react-router-dom"

import LanguageSelector from "../other/LanguageSelector"

const DashboardHeader = ({ name, handleLogOut }) => {
  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  return (
    <div className={`dashboard-header`}>
      <Link
        className="go-back-link"
        to="/"
      >
        {"<"}
      </Link>
      <h3>{t("Saparus Admin Dashboard")}</h3>
      {/* - <p>{name}</p> */}
      <div className="dashboard-navigation-buttons">
        <LanguageSelector className="admin-language-select" />
        <NavLink to="products">{t("Products")}</NavLink>
        <NavLink to="news">{t("News")}</NavLink>
        <NavLink to="about">{t("About")}</NavLink>
        <NavLink to="children">{t("Children Program")}</NavLink>
        <button
          onClick={handleLogOut}
          className="log-out-button"
        >
          {t("log out")}
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader
