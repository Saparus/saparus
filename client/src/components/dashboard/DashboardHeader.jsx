import { NavLink } from "react-router-dom"

const DashboardHeader = ({ name, handleLogOut }) => {
  return (
    <div className={`dashboard-header`}>
      <h3>Admin Dashboard</h3>
      {/* - <p>{name}</p> */}
      <div className="dashboard-navigation-buttons">
        <NavLink to="news">News</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="products">Products</NavLink>
        <button onClick={handleLogOut}>log out</button>
      </div>
    </div>
  )
}

export default DashboardHeader
