const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getAllAboutItems,
  getAllEditAboutItems,
  postAboutItem,
  editAllAboutItems,
  editAboutItem,
  deleteAboutItem,
} = require("../controllers/aboutController")

const router = express.Router()

router.get("/get", getAllAboutItems)
router.get("/getEdit", protect, getAllEditAboutItems)
router.post("/add", protect, postAboutItem) // unused
router.patch("/edit", express.json({ limit: "20mb" }), protect, editAllAboutItems)
router.patch("/edit/:id", protect, editAboutItem) // unused
router.delete("/delete", protect, deleteAboutItem) // unused

module.exports = router
