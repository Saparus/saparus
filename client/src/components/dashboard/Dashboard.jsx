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

  const handleLogOut = () => {
    localStorage.removeItem("accountInfo")
    setAccountInfo(null)
    setIsAuthorized(false)
  }

  useEffect(() => {
    const savedAccountInfo = localStorage.getItem("accountInfo")

    if (!savedAccountInfo) return

    const parsedAccountInfo = JSON.parse(savedAccountInfo)

    const currentTime = new Date().getTime()

    if (parsedAccountInfo.expirationDate && parsedAccountInfo.expirationDate < currentTime) {
      localStorage.removeItem("accountInfo")
      handleLogOut()
    } else {
      setAccountInfo(parsedAccountInfo)
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
    <div className="page dashboard">
      <nav className="navbar">
        <div className="dashboard-title">
          <h3>Admin Dashboard</h3> - <p>{accountInfo?.name}</p>
          <div className="dashboard-navigation-buttons">
            <NavLink to="products">Products</NavLink>
            <NavLink to="news">News</NavLink>
            <button onClick={handleLogOut}>log out</button>
          </div>
        </div>
        {/* <div className="dashboard-navbar">
        <NavLink to="products">Products</NavLink>
        <NavLink to="news">News</NavLink>
        </div> */}
      </nav>
      {renderAskAuthenticationPanel()}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  )
}
export default Dashboard
