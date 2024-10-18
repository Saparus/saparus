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
const editAllAboutItems = async (req, res) => {
  const { aboutItems } = req.body

  res.status(201).json({ message: "edit All About items" })
}

module.exports = {
  getAllAboutItems,
  getAllEditAboutItems,
  editAllAboutItems,
}
