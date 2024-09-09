import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"

import AuthenticationPanel from "./AdminAuthenticationPanel"

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [accountInfo, setAccountInfo] = useState(null)

  const handleSetAccountInfo = (account) => {
    setAccountInfo(account)
    localStorage.setItem("accountInfo", JSON.stringify(account))
  }

  useEffect(() => {
    const savedAccountInfo = localStorage.getItem("accountInfo")

    if (savedAccountInfo) {
      setAccountInfo(JSON.parse(savedAccountInfo))
      setIsAuthorized(true)
    }
  }, [])

  const renderAskAuthenticationPanel = () => {
    if (!isAuthorized) {
      return (
        <AuthenticationPanel
          setAccountInfo={handleSetAccountInfo}
          setIsAuthorized={setIsAuthorized}
        />
      )
    }
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
