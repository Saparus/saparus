// import express from "express"
const express = require("express")

// import { loginAdmin } from "../controllers/authController"
const { loginAdmin, registerAdmin } = require("../controllers/authController")

const router = express.Router()

router.post("/login", loginAdmin)
router.post("/register", registerAdmin)

// export default router
module.exports = router
