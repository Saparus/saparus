import { Link, NavLink, useMatch } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import { ReactComponent as Facebook } from "../../assets/facebook.svg"
import { ReactComponent as Mail } from "../../assets/mail.svg"
import { ReactComponent as Location } from "../../assets/location.svg"
import { ReactComponent as Phone } from "../../assets/phone_white.svg"
import { ReactComponent as Logo } from "../../assets/logo.svg"
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg"

import LanguageSelector from "./LanguageSelector"

const Header = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" })

  const isAdmin = useMatch("/admin/*")

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navRef = useRef()

  const handleOpenDropdownMenu = () => {
    setIsMenuOpen(true)
  }

  const handleCloseDropdownMenu = () => {
    setIsMenuOpen(false)
  }

  useOnClickOutside(navRef, handleCloseDropdownMenu)

  const renderUserHeader = () => {
    return (
      <div className="header-top">
        <Link
          className="logo"
          to="/"
        >
          <Logo />
          <h1>{t("Dental instruments & Equipment")}</h1>
        </Link>

        <nav
          ref={navRef}
          className={`nav-buttons ${isMenuOpen ? "visible" : "inVisible"}`}
        >
          <ul className="nav-links-ul">
            <li>
              <LanguageSelector />
            </li>
            <li>
              <NavLink
                className="nav-link"
                end
                to="/"
              >
                {t("Home")}
              </NavLink>
            </li>
            <span className="link-separator">|</span>
            <li>
              <NavLink
                className="nav-link"
                end
                to="/about"
              >
                {t("About")}
              </NavLink>
            </li>
            <span className="link-separator">|</span>
            <li>
              <NavLink
                className="nav-link"
                end
                to="/catalog"
              >
                {t("Catalog")}
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleOpenDropdownMenu}
          className="hamburger-menu-button"
        >
          <Hamburger />
        </button>
        <div className={`nav-bg ${isMenuOpen ? "visible" : "inVisible"}`}></div>
      </div>
    )
  }

  const renderContactInformation = () => {
    return (
      <div className="header-bottom">
        <div className="contact_us">
          <span>{t("Contact Us")}</span>
          <a
            href="https://facebook.com/SapaRusLTD"
            className="contact"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="icon" />
            {t("Facebook")}
          </a>
          <a
            href="mailto:kim.safarov@saparus.ge"
            className="contact"
            target="_blank"
            rel="noreferrer"
          >
            <Mail className="icon" />
            {t("Email")}
          </a>
          <a
            href="https://maps.app.goo.gl/FRag4mkH8iydc2VR6"
            className="contact"
            target="_blank"
            rel="noreferrer"
          >
            <Location className="icon" />
            {t("Address")}
          </a>
          <a
            href="tel:+995591808457"
            className="contact"
          >
            <Phone
              className="icon"
              target="_blank"
            />
            {t("Phone")}
          </a>
          {/* <a
            target="blank_"
            href="https://www.google.com/maps/place/2+Navtlughi+St,+T'bilisi,+Georgia/@41.6853664,44.83921,17.47z/data=!4m6!3m5!1s0x40440c4c97fa6d4f:0xcfa8a1b7aae8b24e!8m2!3d41.6853125!4d44.8413214!16s%2Fg%2F1ydphwmb2?entry=tts&g_ep=EgoyMDI0MDcxNy4wKgBIAVAD"
          >
            {t("Georgia, Tbilisi, Navtlughi St. 2")}
          </a> */}
        </div>
      </div>
    )
  }

  return (
    <header className="header">
      {isAdmin ? (
        ""
      ) : (
        <>
          {renderUserHeader()} {renderContactInformation()}
        </>
      )}
    </header>
  )
}

export default Header
