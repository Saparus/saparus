const formatDate = (t, date) => {
  const now = new Date()
  const dateToFormat = new Date(date)
  const diffInMs = now - dateToFormat

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInMonths / 12)

  if (diffInMinutes < 1) {
    return t("just now")
  } else if (diffInMinutes < 60) {
    return t(diffInMinutes === 1 ? "minute ago" : "minutes ago", { count: diffInMinutes })
  } else if (diffInHours < 24) {
    const minutesPart = diffInMinutes % 60
    const hoursTranslation = t(diffInHours === 1 ? "hour ago" : "hours ago", { count: diffInHours })
    const minutesTranslation =
      minutesPart > 0
        ? t(minutesPart === 1 ? "minute ago" : "minutes ago", { count: minutesPart })
        : ""
    return `${hoursTranslation}${minutesPart > 0 ? ` and ${minutesTranslation}` : ""}`
  } else if (diffInDays < 30) {
    const hoursPart = diffInHours % 24
    const daysTranslation = t(diffInDays === 1 ? "day ago" : "days ago", { count: diffInDays })
    const hoursTranslation =
      hoursPart > 0 ? t(hoursPart === 1 ? "hour ago" : "hours ago", { count: hoursPart }) : ""
    return `${daysTranslation}${hoursPart > 0 ? ` and ${hoursTranslation}` : ""}`
  } else if (diffInMonths < 12) {
    const daysPart = diffInDays % 30
    const monthsTranslation = t(diffInMonths === 1 ? "month ago" : "months ago", {
      count: diffInMonths,
    })
    const daysTranslation =
      daysPart > 0 ? t(daysPart === 1 ? "day ago" : "days ago", { count: daysPart }) : ""
    return `${monthsTranslation}${daysPart > 0 ? ` and ${daysTranslation}` : ""}`
  } else {
    const monthsPart = diffInMonths % 12
    const yearsTranslation = t(diffInYears === 1 ? "year ago" : "years ago", { count: diffInYears })
    const monthsTranslation =
      monthsPart > 0 ? t(monthsPart === 1 ? "month ago" : "months ago", { count: monthsPart }) : ""
    return `${yearsTranslation}${monthsPart > 0 ? ` and ${monthsTranslation}` : ""}`
  }
}

export default formatDate

// const formatDate = (date, language) => {
//   const now = new Date()
//   const dateToFormat = new Date(date)
//   const diffInMs = now - dateToFormat

//   const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
//   const diffInHours = Math.floor(diffInMinutes / 60)
//   const diffInDays = Math.floor(diffInHours / 24)
//   const diffInMonths = Math.floor(diffInDays / 30)
//   const diffInYears = Math.floor(diffInMonths / 12)

//   if (diffInMinutes < 1) {
//     return "just now"
//   } else if (diffInMinutes < 60) {
//     return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
//   } else if (diffInHours < 24) {
//     const minutesPart = diffInMinutes % 60
//     return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""}${
//       minutesPart > 0 ? ` and ${minutesPart} minute${minutesPart !== 1 ? "s" : ""}` : ""
//     } ago`
//   } else if (diffInDays < 30) {
//     const hoursPart = diffInHours % 24
//     return `${diffInDays} day${diffInDays !== 1 ? "s" : ""}${
//       hoursPart > 0 ? ` and ${hoursPart} hour${hoursPart !== 1 ? "s" : ""}` : ""
//     } ago`
//   } else if (diffInMonths < 12) {
//     const daysPart = diffInDays % 30
//     return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}${
//       daysPart > 0 ? ` and ${daysPart} day${daysPart !== 1 ? "s" : ""}` : ""
//     } ago`
//   } else {
//     const monthsPart = diffInMonths % 12
//     return `${diffInYears} year${diffInYears !== 1 ? "s" : ""}${
//       monthsPart > 0 ? ` and ${monthsPart} month${monthsPart !== 1 ? "s" : ""}` : ""
//     } ago`
//   }
// }

// export default formatDate
