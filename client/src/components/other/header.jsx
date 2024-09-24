import { Link, NavLink, useLocation, useMatch } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

import { ReactComponent as Logo } from "../../assets/logo.svg"

import LanguageSelector from "./LanguageSelector"

const Header = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" })

  const isAdmin = useMatch("/admin/*")

  return (
    <header className="header">
      <div className="header-top">
        <Link
          className="logo"
          to="/"
        >
          <Logo />
          <h1>Dental instruments & Equipment</h1>
        </Link>

        <nav className="nav-buttons">
          <ul>
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
      </div>

      {isAdmin ? (
        ""
      ) : (
        <div className="header-bottom">
          <div className="contact_us">
            <span>{t("Contact Us")}</span>
            <a href="tel:+995591808457">(+995) 591 80 84 57</a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://facebook.com/SapaRusLTD"
            >
              facebook.com/SapaRusLTD
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:kim.safarov@saparus.ge"
            >
              kim.safarov@saparus.ge
            </a>
            <a
              target="blank_"
              href="https://www.google.com/maps/place/2+Navtlughi+St,+T'bilisi,+Georgia/@41.6853664,44.83921,17.47z/data=!4m6!3m5!1s0x40440c4c97fa6d4f:0xcfa8a1b7aae8b24e!8m2!3d41.6853125!4d44.8413214!16s%2Fg%2F1ydphwmb2?entry=tts&g_ep=EgoyMDI0MDcxNy4wKgBIAVAD"
            >
              Georgia, Tbilisi, Navtlughi St. 2
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
