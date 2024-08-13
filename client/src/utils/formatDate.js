const dateFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}

const formatDate = (date) => {
  const dateToFormat = new Date(date)
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateFormatOptions).format(dateToFormat)

  return formattedDate
}

export default formatDate
