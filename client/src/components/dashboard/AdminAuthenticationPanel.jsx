import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { login } from "../../services/authServices"

const AuthenticationPanel = ({ setAccountInfo, setIsAuthorized }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState({ emailError: [], passwordError: [] })

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const handleChangeCredentials = (credential, newValue) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [credential]: newValue,
    }))
  }

  const handleLogIn = async () => {
    if (!credentials.email || !credentials.password) {
      setError({
        emailError: !credentials.email ? ["Email is required"] : [],
        passwordError: !credentials.password ? ["Password is required"] : [],
      })
      return
    }

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
          {t("go back")}{" "}
        </Link>
        <div className="admin-auth-input">
          <p className="login-title">{t("admin login")}</p>
          <label htmlFor="name">
            <input
              onChange={(e) => {
                handleChangeCredentials("email", e.target.value)
              }}
              value={credentials.email}
              id="name"
              name="email"
              placeholder={t("email")}
              type="text"
            />
            {error?.emailError?.length > 0 ? (
              <ul className="error-list">
                {error.emailError.map((emailError) => (
                  <li
                    className="error-item"
                    key={emailError}
                  >
                    {emailError}
                  </li>
                ))}
              </ul>
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
              placeholder={t("password")}
              type="password"
            />
            {error?.passwordError?.length > 0 ? (
              <ul className="error-list">
                {error.passwordError.map((passwordError) => (
                  <li
                    className="error-item"
                    key={passwordError}
                  >
                    {passwordError}
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </label>
          <button
            onClick={handleLogIn}
            className="submit-code"
          >
            {t("enter")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPanel
