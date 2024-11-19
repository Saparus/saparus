const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllChildrenProgramArticles,
  getEditChildrenProgramArticles,
  getSingleChildrenProgramArticle,
  getEditSingleChildrenProgramArticle,
  postChildrenProgramArticle,
  editChildrenProgramArticle,
  deleteChildrenProgramArticle,
} = require("../controllers/childrenProgramController")

const router = express.Router()

router.get("/get", getAllChildrenProgramArticles)
router.get("/getEdit", protect, getEditChildrenProgramArticles)
router.get("/get/:id", getSingleChildrenProgramArticle)
router.get("/getEdit/:id", protect, getEditSingleChildrenProgramArticle)
router.post("/post", protect, postChildrenProgramArticle)
router.patch("/edit/:id", protect, editChildrenProgramArticle)
router.delete("/delete/:id", protect, deleteChildrenProgramArticle)

module.exports = router
