import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { login } from "../../services/authServices"

const AuthenticationPanel = ({ setAccountInfo, setIsAuthorized }) => {
  const [authCode, setAuthCode] = useState("")
  const [error, setError] = useState()

  const { t } = useTranslation("translation", { keyPrefix: "admin" })

  const handleChangeAuthCode = (newValue) => {
    setAuthCode(newValue)

    setError()
  }

  const handleLogIn = async () => {
    if (!authCode) {
      setError("Please provide your authentication code")
      return
    }

    try {
      const response = await login(authCode)

      console.log(response)

      setAccountInfo(response)
      setIsAuthorized(true)
    } catch (error) {
      setError(error?.response?.data?.message || error?.message || "Login failed")
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
          <label htmlFor="authCode">
            <input
              onChange={(e) => {
                handleChangeAuthCode(e.target.value)
              }}
              value={authCode}
              id="authCode"
              name="authCode"
              placeholder={t("email")}
              type="text"
            />
          </label>
          {error?.length > 0 ? <div className="login-error">{error}</div> : ""}
          <button
            onClick={handleLogIn}
            className="submit-code"
            disabled={!authCode || error}
          >
            {t("enter")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPanel
