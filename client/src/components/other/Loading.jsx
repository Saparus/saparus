import { useTranslation } from "react-i18next"

const Loading = () => {
  const { t } = useTranslation("translation", { keyPrefix: "other" })

  return (
    <div className="loading-content">
      <div className="spinner"></div>
      <p>{t("Loading...")}</p>
    </div>
  )
}

export default Loading
