import React from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/logo_white.svg"
import { ReactComponent as Facebook } from "../assets/facebook.svg"
import { ReactComponent as Mail } from "../assets/mail.svg"
import { ReactComponent as Location } from "../assets/location.svg"
import { ReactComponent as Phone } from "../assets/phone_white.svg"

export function Contacts() {
  return (
    <div className="contacts">
      <a
        href="https://facebook.com/SapaRusLTD"
        className="contact"
        target="_blank"
        rel="noreferrer"
      >
        <Facebook className="icon" />
        facebook.com/SapaRusLTD
      </a>
      <a
        href="mailto:kim.safarov@saparus.ge"
        className="contact"
        target="_blank"
        rel="noreferrer"
      >
        <Mail className="icon" />
        kim.safarov@saparus.ge
      </a>
      <a
        href="https://maps.app.goo.gl/FRag4mkH8iydc2VR6"
        className="contact"
        target="_blank"
        rel="noreferrer"
      >
        <Location className="icon" />
        Georgia, Tbilisi, Navtlughi St. 2
      </a>
      <a
        href="tel:+995591808457"
        className="contact"
      >
        <Phone
          className="icon"
          target="_blank"
        />
        +(995) 591 80 84 57
      </a>
    </div>
  )
}

const Footer = () => {
  const location = useLocation()

  return (
    <div className={`footer ${location.pathname === "/about" ? "hide-shadow" : ""}`}>
      <div className="logo">
        <button className="stamp">
          <Link to="/">
            <Logo />
          </Link>
        </button>
        <h5 className="license">© 2024 Ltd. Saparus. All Rights Reserved</h5>
      </div>
      <Contacts />
    </div>
  )
}

export default Footer
