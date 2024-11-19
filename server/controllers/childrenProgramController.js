const childrenProgramArticlesArticles = require("../data/childrenProgram")

const getAllChildrenProgramArticles = async (req, res) => {
  const { language, limit, page } = req.query

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const childrenProgramArticlesToSend = childrenProgramArticlesArticles.map((newsItem) => {
    const tempNewsItem = { ...newsItem }
    tempNewsItem.text = newsItem.text[languageToApply]
    tempNewsItem.title = newsItem.title[languageToApply]

    return tempNewsItem
  })

  childrenProgramArticlesToSend.sort((a, b) => a.date - b.date)

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedArticles = childrenProgramArticlesToSend.slice(startIndex, endIndex)

  const hasNextPage = endIndex < childrenProgramArticlesToSend.length

  const dataToSend = {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalArticles: childrenProgramArticlesToSend.length,
      totalPages: Math.ceil(childrenProgramArticlesToSend.length / limit),
    },
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const getEditChildrenProgramArticles = async (req, res) => {
  const { limit, page } = req.query

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedArticles = childrenProgramArticlesArticles.slice(startIndex, endIndex)

  const hasNextPage = endIndex < childrenProgramArticlesArticles.length

  const dataToSend = {
    articles: paginatedArticles,
    pagination: {
      currentPage: page,
      hasNextPage: hasNextPage,
      totalArticles: childrenProgramArticlesArticles.length,
      totalPages: Math.ceil(childrenProgramArticlesArticles.length / limit),
    },
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const getEditSingleChildrenProgramArticle = async (req, res) => {
  const { id } = req.params

  const article = childrenProgramArticlesArticles.find((article) => article.id === Number(id))

  if (!article) {
    return res.status(404).json({ message: "Children program article not found" })
  }

  res.status(201).json(article)
}

const getSingleChildrenProgramArticle = async (req, res) => {
  const { language } = req.query
  const { id } = req.params

  const article = childrenProgramArticlesArticles.find((article) => article.id === Number(id))

  if (!article) {
    return res.status(404).json({ message: "Children program article not found" })
  }

  const { title, text } = article

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const dataToSend = {
    ...article,
    title: title[languageToApply],
    text: text[languageToApply],
  }

  res.status(201).json(dataToSend)
}

// PROTECTED
const postChildrenProgramArticle = async (req, res) => {
  const { title, text, images } = req.body

  res.status(201).json({ message: "Post children program article" })
}

// PROTECTED
const editChildrenProgramArticle = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "Edit children program article" })
}

// PROTECTED
const deleteChildrenProgramArticle = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "Delete children program article" })
}

module.exports = {
  getAllChildrenProgramArticles,
  getSingleChildrenProgramArticle,
  getEditChildrenProgramArticles,
  getEditSingleChildrenProgramArticle,
  postChildrenProgramArticle,
  editChildrenProgramArticle,
  deleteChildrenProgramArticle,
}
