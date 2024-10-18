const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllAboutItems,
  getAllEditAboutItems,
  editAllAboutItems,
} = require("../controllers/aboutController")

const router = express.Router()

router.get("/get", getAllAboutItems)
router.get("/getEdit", protect, getAllEditAboutItems)
router.patch("/edit", express.json({ limit: "20mb" }), protect, editAllAboutItems)

module.exports = router
