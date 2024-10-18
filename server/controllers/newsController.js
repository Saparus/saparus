const newsArticles = require("../data/news")

const getAllNewsArticles = async (req, res) => {
  const { language, limit, page } = req.query

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const newsToSend = newsArticles.map((newsItem) => {
    const tempNewsItem = { ...newsItem }
    tempNewsItem.text = newsItem.text[languageToApply]
    tempNewsItem.title = newsItem.title[languageToApply]

    return tempNewsItem
  })

  newsToSend.sort((a, b) => a.date - b.date)

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedNewsArticles = newsToSend.slice(startIndex, endIndex)

  const hasNextPage = endIndex < newsToSend.length

  const dataToSend = {
    articles: paginatedNewsArticles,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalNewsArticles: newsToSend.length,
      totalPages: Math.ceil(newsToSend.length / limit),
    },
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const getEditNewsArticles = async (req, res) => {
  const { limit, page } = req.query

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedNewsArticles = newsArticles.slice(startIndex, endIndex)

  const hasNextPage = endIndex < newsArticles.length

  const dataToSend = {
    articles: paginatedNewsArticles,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalNewsArticles: newsArticles.length,
      totalPages: Math.ceil(newsArticles.length / limit),
    },
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const getEditSingleNewsArticle = async (req, res) => {
  const { id } = req.params

  const newsArticle = newsArticles.filter((product) => product.id === Number(id))[0]

  res.status(201).json(newsArticle)
}

const getSingleNewsArticle = async (req, res) => {
  const { language } = req.query
  const { id } = req.params

  const newsArticle = newsArticles.filter((product) => product.id === Number(id))[0]

  const { title, text } = newsArticle

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const dataToSend = {
    ...newsArticle,
    title: title[languageToApply],
    text: text[languageToApply],
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const postNewsArticle = async (req, res) => {
  const { title, text, images } = req.body

  res.status(201).json({ message: "post News article" })
}

// PROTECTED
const editNewsArticle = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "edit News article" })
}

// PROTECTED0
const deleteNewsArticle = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "delete News article" })
}

module.exports = {
  getAllNewsArticles,
  getSingleNewsArticle,
  getEditNewsArticles,
  getEditSingleNewsArticle,
  postNewsArticle,
  editNewsArticle,
  deleteNewsArticle,
}
