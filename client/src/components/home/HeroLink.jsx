import { Link } from "react-router-dom"

const HeroLink = ({ text, icon, url }) => {
  return (
    <Link
      className="hero-link"
      to={url}
    >
      <div className="icon-wrapper">{icon}</div>
      <div className="hero-link-text">{text}</div>
    </Link>
  )
}

export default HeroLink
