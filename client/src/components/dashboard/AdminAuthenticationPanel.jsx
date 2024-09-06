import { Link } from "react-router-dom"

const AuthenticationPanel = ({ setIsAuthorized }) => {
  console.log(setIsAuthorized)

  const handleLogIn = () => {
    setIsAuthorized(true)
  }

  return (
    <div className="admin-code">
      <div className="admin-code-panel">
        <Link
          className="go-back-link"
          to="../../"
        >
          go back{" "}
        </Link>
        <div className="admin-code-input">
          <input
            name="admin-code"
            placeholder="authentication code"
            type="text"
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
