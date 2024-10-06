// import express from "express"
const express = require("express")
// import cors from "cors"
const cors = require("cors")

// import authRoutes from "./routes/authRoutes"
// import productRoutes from "./routes/productRoutes"
// import newsRoutes from "./routes/newsRoutes"

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const aboutRoutes = require("./routes/aboutRoutes")
const newsRoutes = require("./routes/newsRoutes")

const PORT = process.env.PORT || 8000

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: false }))

app.use("/auth", authRoutes)
app.use("/product", productRoutes)
app.use("/about", aboutRoutes)
app.use("/news", newsRoutes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
