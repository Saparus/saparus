import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"

import AuthenticationPanel from "./AdminAuthenticationPanel"

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [token, setToken] = useState(null)

  const renderAskAuthenticationPanel = () => {
    if (!isAuthorized) return <AuthenticationPanel setIsAuthorized={setIsAuthorized} />
  }

  return (
    <div className="dashboard page">
      <nav className="navbar">
        <NavLink to="news">News</NavLink>
        <NavLink to="products">Products</NavLink>
      </nav>
      {renderAskAuthenticationPanel()}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}
export default Dashboard
