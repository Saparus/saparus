// import jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken")

const accounts = [
  {
    id: 1,
    name: "Johnny doe",
    email: "1@saparus.ge",
    password: "password1",
  },
  {
    id: 2,
    name: "Johnathan Doe",
    email: "2@saparus.ge",
    password: "password1",
  },
  {
    id: 3,
    name: "Jon Doe",
    email: "3@saparus.ge",
    password: "password1",
  },
]

// logs in admin
// export const loginAdmin = (req, res) => {
const loginAdmin = (req, res) => {
  const { email, password } = req.body

  const emailError = []
  const passwordError = []

  if (!email) {
    emailError.push("Please, add email")
  }

  if (!password) {
    passwordError.push("Please, add password")
  }

  if (emailError.length > 0 || passwordError.length > 0) {
    res.status(400).json({ emailError, passwordError })
    return
  }

  const user = accounts.find((account) => account.email === email)

  if (!user) {
    res.status(400).json({ emailError: ["wrong email"], passwordError: [] })
    return
  }

  if (user.password !== password) {
    res.status(400).json({ emailError: [], passwordError: ["incorrect password"] })
    return
  }

  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 24)

  res.status(201).json({
    name: user.name,
    token: generateToken(user._id),
    expirationDate: expirationDate.getTime(),
  })
}

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }) // it will expire in 1 day (24hours)
}

module.exports = { loginAdmin }
