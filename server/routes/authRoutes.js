// import express from "express"
const express = require("express")

// import { loginAdmin } from "../controllers/authController"
const { loginAdmin } = require("../controllers/authController")

const router = express.Router()

router.post("/login", loginAdmin)

// export default router
module.exports = router
