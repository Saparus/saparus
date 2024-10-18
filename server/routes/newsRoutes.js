const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllNewsArticles,
  getEditNewsArticles,
  getSingleNewsArticle,
  getEditSingleNewsArticle,
  postNewsArticle,
  editNewsArticle,
  deleteNewsArticle,
} = require("../controllers/newsController")

const router = express.Router()

router.get("/get", getAllNewsArticles)
router.get("/getEdit", protect, getEditNewsArticles)
router.get("/get/:id", getSingleNewsArticle)
router.get("/getEdit/:id", getEditSingleNewsArticle)
router.post("/post", protect, postNewsArticle)
router.patch("/edit/:id", protect, editNewsArticle)
router.delete("/delete/:id", protect, deleteNewsArticle)

module.exports = router
