const getAllNewsArticles = async (req, res) => {
  res.status(201).json({ message: "edit News articles" })
}

const getSingleNewsArticle = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "get News article" })
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

module.exports = {
  getAllNewsArticles,
  getSingleNewsArticle,
  postNewsArticle,
  editNewsArticle,
}
