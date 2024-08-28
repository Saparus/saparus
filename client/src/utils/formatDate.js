const formatDate = (date) => {
  const now = new Date()
  const dateToFormat = new Date(date)
  const diffInMs = now - dateToFormat

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInMonths / 12)

  if (diffInMinutes < 1) {
    return "just now"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} and ${diffInMinutes % 60} minute${
      diffInMinutes % 60 !== 1 ? "s" : ""
    } ago`
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} and ${diffInHours % 24} hour${
      diffInHours % 24 !== 1 ? "s" : ""
    } ago`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} and ${diffInDays % 30} day${
      diffInDays % 30 !== 1 ? "s" : ""
    } ago`
  } else {
    return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} and ${diffInMonths % 12} month${
      diffInMonths % 12 !== 1 ? "s" : ""
    } ago`
  }
}

export default formatDate
