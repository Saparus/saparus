const aboutList = require("../data/about")

// gets all about items (in all languages)
const getAllAboutItems = async (req, res) => {
  const { language } = req.query

  const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  const itemsToReturn = aboutList.map((aboutItem) => {
    const { title, text } = aboutItem

    return { ...aboutItem, title: title[languageToApply], text: text[languageToApply] }
  })

  res.status(201).json(itemsToReturn)
}

const getAllEditAboutItems = async (req, res) => {
  // const { language } = req.query

  // const languageToApply = ["en", "ka", "ru"].includes(language) ? language : "en"

  // const itemsToReturn = aboutList.map((aboutItem) => {
  //   const { title, text } = aboutItem

  //   return { ...aboutItem, title: title[languageToApply], text: text[languageToApply] }
  // })

  res.status(201).json(aboutList)
}

// PROTECTED
const postAboutItem = async (req, res) => {
  const { language } = req.body
  const { id } = req.params

  res.status(201).json({ message: "post About item" })
}

// PROTECTED
const editAllAboutItems = async (req, res) => {
  const { aboutItems } = req.body

  res.status(201).json({ message: "edit All About items" })
}

// PROTECTED
const editAboutItem = async (req, res) => {
  const { id } = req.params

  res.status(201).json({ message: "edit About item" })
}

// PROTECTED
const deleteAboutItem = async (req, res) => {
  const { id, name, images, inStock, fixedPrice, price } = req.body

  res.status(201).json({ message: "delete About item" })
}

module.exports = {
  getAllAboutItems,
  getAllEditAboutItems,
  postAboutItem,
  editAllAboutItems,
  editAboutItem,
  deleteAboutItem,
}
