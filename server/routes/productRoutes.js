const express = require("express")

const protect = require("../middleware/authMiddleware")

const {
  getCategories,
  getProducts,
  getProduct,
  getEditProduct,
  deleteProduct,
  addProduct,
  editProduct,
} = require("../controllers/productController")

const router = express.Router()

router.get("/categories", getCategories)
router.get("/get", getProducts)
router.get("/get/:id", getProduct)
router.get("/getEdit/:id", protect, getEditProduct)
router.delete("/delete/:id", protect, deleteProduct)
router.post("/add", protect, addProduct)
router.patch("/edit/:id", protect, editProduct)

module.exports = router
