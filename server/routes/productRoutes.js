const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getProducts,
  getProduct,
  getEditProduct,
  deleteProduct,
  addProducts,
  editProduct,
} = require("../controllers/productController")

const router = express.Router()

router.get("/get", getProducts)
router.get("/get/:id", getProduct)
router.get("/getEdit/:id", protect, getEditProduct)
router.delete("/delete/:id", protect, deleteProduct)
router.post("/add", protect, addProducts)
router.patch("/edit/:id", protect, editProduct)

module.exports = router
