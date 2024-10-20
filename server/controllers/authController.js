// import jwt from "jsonwebtoken"
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const accounts = [
  {
    id: 1,
    name: "Johnny Doe",
    email: "1@saparus.ge",
    password: "$2a$10$Vf/wstJI66eqye6HcE1efewU7xeR9.vy5ZFKPWPbnsmOL7xXXNotq", // strongerpassword
  },
  {
    id: 2,
    name: "Johnathan Doe",
    email: "2@saparus.ge",
    password: "$2a$10$iAlSy21oKKAEHqUf0VPyMeCE7pPAJdxLzi3rk7PQA8gad/giZiffG", // password
  },
  {
    id: 3,
    name: "Jon Doe",
    email: "3@saparus.ge",
    password: "$2a$10$nzUSPWTYYb1uidO/IuKFbeN8G1L.E3pcFnvHmxRNVxEFnTTslDubu", // mYrP4W4FORCKko1IRfIlZ14S
  },
]

const loginAdmin = async (req, res) => {
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
    res.status(400).json({ emailError: ["incorrect email"], passwordError: [] })
    return
  }

  console.log(
    user.name,
    (await bcrypt.compare(password, user.password)) ? "logged in" : "didn't log in"
  )

  if (user && !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ emailError: [], passwordError: ["incorrect password"] })
    return
  }

  // if (user.password !== password) {
  //   res.status(400).json({ emailError: [], passwordError: ["incorrect password"] })
  //   return
  // }

  const expirationDate = new Date()
  expirationDate.setHours(expirationDate.getHours() + 24)

  res.status(201).json({
    name: user.name,
    token: generateToken(user.id),
    expirationDate: expirationDate.getTime(),
  })
}

// temp code, is used only to hash passwords
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  console.log({ name, email, password: hashedPassword })

  res.status(201).json({
    name,
    email,
    hashedPassword,
  })
}

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }) // it will expire in 1 day (24hours)
}

module.exports = { loginAdmin, registerAdmin }
