import React from "react"
import { Link, NavLink } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/logo.svg"

function nav() {
  return (
    <header className="nav">
      <Link
        className="logo"
        to="/"
      >
        <Logo />
        <h1>Dental instruments & Equipment</h1>
      </Link>
      <div className="contact_us">
        <a href="tel:+995591808457">
          Contact Us: <span>(+995) 591 80 84 57</span>
        </a>
      </div>
      <nav className="nav-buttons">
        <ul>
          <li>
            <NavLink
              className="nav-link"
              end
              to="/"
            >
              Home
            </NavLink>
          </li>
          <span className="link-separator">|</span>
          <li>
            <NavLink
              className="nav-link"
              end
              to="/about"
            >
              About
            </NavLink>
          </li>
          <span className="link-separator">|</span>
          <li>
            <NavLink
              className="nav-link"
              end
              to="/catalog"
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default nav
