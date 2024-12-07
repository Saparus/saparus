const serverless = require("serverless-http")

const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const aboutRoutes = require("./routes/aboutRoutes")
const newsRoutes = require("./routes/newsRoutes")
const childrenRoutes = require("./routes/childrenProgramRoutes")

// const PORT = process.env.PORT || 8000

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
app.use("/children", childrenRoutes)

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
module.exports.handler = serverless(app)
