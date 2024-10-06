// import express from "express"
const express = require("express")

const protect = require("../middleware/authMiddleware")

// import { loginAdmin } from "../controllers/authController"
const { loginAdmin, registerAdmin } = require("../controllers/authController")

const router = express.Router()

router.post("/login", loginAdmin)
router.post("/register", protect, registerAdmin)

// export default router
module.exports = router
