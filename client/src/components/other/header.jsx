import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

import { ReactComponent as Logo } from "../../assets/logo.svg"

import LanguageSelector from "./LanguageSelector"

const Header = () => {
  const { t } = useTranslation("translation", { keyPrefix: "header" })

  // const [language, setCurrentLanguage] = useStore((state) => [state.language, state.setLanguage])

  // const systemDefaultLanguage = navigator.language.split("-")[0]
  // let defaultLanguageToDisplay = "en"

  // useEffect(() => {
  //   console.log(language)
  // }, [])

  // console.log(systemDefaultLanguage)

  return (
    <header className="header">
      <Link
        className="logo"
        to="/"
      >
        <Logo />
        <h1>Dental instruments & Equipment</h1>
      </Link>
      <div className="contact_us">
        <a href="tel:+995591808457">
          {t("Contact Us")}: <span>(+995) 591 80 84 57</span>
        </a>
      </div>
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
    </header>
  )
}

export default Header
