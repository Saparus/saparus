import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { ReactComponent as Logo } from "../../assets/logo_white.svg"
import { ReactComponent as Facebook } from "../../assets/facebook.svg"
import { ReactComponent as Mail } from "../../assets/mail.svg"
import { ReactComponent as Location } from "../../assets/location.svg"
import { ReactComponent as Phone } from "../../assets/phone_white.svg"

export const Contacts = () => {
  const { t } = useTranslation("translation", { keyPrefix: "other" })

  return (
    <div className="contacts">
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
    </div>
  )
}

const Footer = () => {
  const { t } = useTranslation("translation", { keyPrefix: "footer" })

  const location = useLocation()

  return (
    <div className={`footer ${location.pathname === "/about" ? "hide-shadow" : ""}`}>
      <div className="logo">
        <button className="stamp">
          <Link to="/">
            <Logo />
          </Link>
        </button>
        <h5 className="license">
          © {new Date().getFullYear()} {t("Ltd. Saparus. All Rights Reserved")}
        </h5>
      </div>
      <Contacts />
    </div>
  )
}

export default Footer
