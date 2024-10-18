import { useTranslation } from "react-i18next"

const PageNotFount = () => {
  const { t } = useTranslation("translation", { keyPrefix: "other" })

  return (
    <div className="page page-not-found-page">
      <h2>
        <span>404</span> {t("Page Not Found")}
      </h2>
    </div>
  )
}

export default PageNotFount
