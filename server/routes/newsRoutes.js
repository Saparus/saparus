const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllNews,
  getSingleNewsArticle,
  postNews,
  updateNews,
} = require("../controllers/newsController")

const router = express.Router()

router.get("/get", getAllNews)
router.get("/get/:id", getSingleNewsArticle)
router.post("/post", protect, postNews)
router.patch("/update/:id", protect, updateNews)

module.exports = router
