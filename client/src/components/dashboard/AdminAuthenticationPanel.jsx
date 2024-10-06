import { useState } from "react"
import { Link } from "react-router-dom"

import { login } from "../../services/authServices"

const AuthenticationPanel = ({ setAccountInfo, setIsAuthorized }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState({ emailError: "", passwordError: "" })

  const handleChangeCredentials = (credential, newValue) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credential]: newValue,
    }))
  }

  const handleLogIn = async () => {
    try {
      const response = await login(credentials)

      setAccountInfo(response)
      setIsAuthorized(true)
    } catch (error) {
      setError(error.response?.data || "Login failed")
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
          <label htmlFor="name">
            <input
              onChange={(e) => {
                handleChangeCredentials("email", e.target.value)
              }}
              value={credentials.email}
              id="name"
              name="email"
              placeholder="email"
              type="text"
            />
            {error.emailError ? (
              <div className="error-list">
                {error.emailError.map((emailError) => (
                  <p
                    className="error-item"
                    key={emailError}
                  >
                    {emailError}
                  </p>
                ))}
              </div>
            ) : (
              ""
            )}
          </label>
          <label htmlFor="password">
            <input
              onChange={(e) => {
                handleChangeCredentials("password", e.target.value)
              }}
              value={credentials.username}
              id="password"
              name="password"
              placeholder="password"
              type="password"
            />
            {error.passwordError ? (
              <div className="error-list">
                {error.passwordError.map((passwordError) => (
                  <p
                    className="error-item"
                    key={passwordError}
                  >
                    {passwordError}
                  </p>
                ))}
              </div>
            ) : (
              ""
            )}
          </label>
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
