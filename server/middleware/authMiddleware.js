const jwt = require("jsonwebtoken")

const accounts = [
  {
    id: 1,
    name: "Johnny Doe",
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

const protect = (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // gets token from header
      token = req.headers.authorization.split(" ")[1]

      // verifies token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // finds user by ID from the accounts array
      const user = accounts.find((acc) => acc.id === decoded.id)

      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" })
        return
      }

      // attaches user to request object (without password)
      req.user = { id: user.id, name: user.name, email: user.email }

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: "Not authorized" })
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" })
  }
}

module.exports = protect
