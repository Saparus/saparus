const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getProducts,
  getSingleProduct,
  getEditProduct,
  addProducts,
  updateProduct,
} = require("../controllers/productController")

const router = express.Router()

router.get("/get", protect, getProducts)
router.get("/get/:id", getSingleProduct)
router.post("/getEdit/:id", protect, getEditProduct)
router.post("/add", protect, addProducts)
router.patch("/update/:id", protect, updateProduct)

module.exports = router
