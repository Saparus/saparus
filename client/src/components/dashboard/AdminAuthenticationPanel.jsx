import { useState } from "react"
import { Link } from "react-router-dom"

import { login } from "../../services/ajax"

const AuthenticationPanel = ({ setAccountInfo, setIsAuthorized }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)

  const handleChangeCredentials = (credential, newValue) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credential]: newValue,
    }))
  }

  const handleLogIn = async () => {
    try {
      const response = await login(credentials)

      setAccountInfo(response.data)
      setIsAuthorized(true)
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-auth-panel">
        <Link
          className="go-back-link"
          to="../../"
        >
          go back{" "}
        </Link>
        <div className="admin-auth-input">
          <p className="login-title">admin login</p>
          <input
            onChange={(e) => {
              handleChangeCredentials("email", e.target.value)
            }}
            value={credentials.email}
            name="email"
            placeholder="email"
            type="text"
          />
          <input
            onChange={(e) => {
              handleChangeCredentials("password", e.target.value)
            }}
            value={credentials.username}
            name="password"
            placeholder="password"
            type="password"
          />
          <button
            onClick={handleLogIn}
            className="submit-code"
          >
            enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPanel
