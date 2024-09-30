import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"

import AuthenticationPanel from "./AdminAuthenticationPanel"
import DashboardHeader from "./DashboardHeader"

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
          isAuthorized={isAuthorized}
          setAccountInfo={handleSetAccountInfo}
          setIsAuthorized={setIsAuthorized}
        />
      )
    }
  }

  return (
    <div className="page dashboard">
      <nav className="navbar">
        <DashboardHeader
          isAuthorized={isAuthorized}
          name={accountInfo?.name}
          handleLogOut={handleLogOut}
          token={accountInfo?.token}
        />
      </nav>
      {renderAskAuthenticationPanel()}
      <div className="outlet">
        <Outlet context={{ isAuthorized, token: accountInfo?.token }} />
      </div>
    </div>
  )
}
export default Dashboard
