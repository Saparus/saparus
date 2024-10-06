const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllNewsArticles,
  getSingleNewsArticle,
  postNewsArticle,
  editNewsArticle,
} = require("../controllers/newsController")

const router = express.Router()

router.get("/get", getAllNewsArticles)
router.get("/get/:id", getSingleNewsArticle)
router.post("/post", protect, postNewsArticle)
router.patch("/edit/:id", protect, editNewsArticle)

module.exports = router
