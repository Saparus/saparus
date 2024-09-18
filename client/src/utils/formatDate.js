const formatDate = (t, date) => {
  const now = new Date()
  const dateToFormat = new Date(date)
  const diffInMs = now - dateToFormat

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInMonths / 12)

  const calculateDate = () => {
    if (diffInMinutes < 1) {
      return t("just now")
    } else if (diffInMinutes < 60) {
      return t(diffInMinutes === 1 ? "minute" : "minutes", { count: diffInMinutes })
    } else if (diffInHours < 24) {
      const minutesPart = diffInMinutes % 60
      const hoursTranslation = t(diffInHours === 1 ? "hour" : "hours", { count: diffInHours })
      const minutesTranslation =
        minutesPart > 0 ? t(minutesPart === 1 ? "minute" : "minutes", { count: minutesPart }) : ""
      return `${hoursTranslation}${minutesPart > 0 ? ` ${t("and")} ${minutesTranslation}` : ""}`
    } else if (diffInDays < 30) {
      const hoursPart = diffInHours % 24
      const daysTranslation = t(diffInDays === 1 ? "day" : "days", { count: diffInDays })
      const hoursTranslation =
        hoursPart > 0 ? t(hoursPart === 1 ? "hour" : "hours", { count: hoursPart }) : ""
      return `${daysTranslation}${hoursPart > 0 ? ` ${t("and")} ${hoursTranslation}` : ""}`
    } else if (diffInMonths < 12) {
      const daysPart = diffInDays % 30
      const monthsTranslation = t(diffInMonths === 1 ? "month" : "months", {
        count: diffInMonths,
      })
      const daysTranslation =
        daysPart > 0 ? t(daysPart === 1 ? "day" : "days", { count: daysPart }) : ""
      return `${monthsTranslation}${daysPart > 0 ? ` ${t("and")} ${daysTranslation}` : ""}`
    } else {
      const monthsPart = diffInMonths % 12
      const yearsTranslation = t(diffInYears === 1 ? "year" : "years", { count: diffInYears })
      const monthsTranslation =
        monthsPart > 0 ? t(monthsPart === 1 ? "month" : "months", { count: monthsPart }) : ""
      return `${yearsTranslation}${monthsPart > 0 ? ` ${t("and")} ${monthsTranslation}` : ""}`
    }
  }

  return calculateDate() + " " + t("ago")
}

export default formatDate
