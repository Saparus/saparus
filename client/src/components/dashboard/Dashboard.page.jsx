import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

import AuthenticationPanel from "./AdminAuthenticationPanel"
import DashboardHeader from "./DashboardHeader"

const Dashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [accountInfo, setAccountInfo] = useState(null)

  const handleSetAccountInfo = (account) => {
    setAccountInfo(account)
    localStorage.setItem("accountInfo", JSON.stringify(account))

    toast.success("You've successfully logged in.")
  }

  const handleLogOut = (showToast = true) => {
    localStorage.removeItem("accountInfo")
    setAccountInfo(null)
    setIsAuthorized(false)

    if (showToast) toast.success("You've successfully logged out.")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo?.expirationDate])

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
          apiKey={accountInfo?.apiKey}
        />
      </nav>
      {renderAskAuthenticationPanel()}
      <div className="outlet">
        <Outlet context={{ isAuthorized, apiKey: accountInfo?.apiKey }} />
      </div>
    </div>
  )
}
export default Dashboard
