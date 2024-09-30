import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

import HeroLink from "./HeroLink"
import NewsItem from "./NewsItem"
import Loading from "../other/Loading"
import HomePageNews from "./HomePageNews"

// import { ReactComponent as Logo } from "../../assets/logo.svg"
import { ReactComponent as LogoIcon } from "../../assets/logo_white.svg"
import { ReactComponent as CatalogIcon } from "../../assets/icons/catalog.svg"
import { ReactComponent as Child } from "../../assets/icons/child.svg"

import { getAllNews } from "../../data/news"
import formatDate from "../../utils/formatDate"

const Home = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page home">
      <div className="hero">
        <div className="hero-text">
          <h2>Empowering Smiles With Precision</h2>
        </div>
        <div className="hero-logo">
          <LogoIcon />
        </div>
        <div className="hero-links">
          <div className="hero-link-list">
            <HeroLink
              text="Contact Us"
              url="/about"
              icon={<LogoIcon />}
            />
            <HeroLink
              text="View Catalog"
              url="/catalog"
              icon={<CatalogIcon />}
            />
            <HeroLink
              text="Child Program"
              url="/children_program"
              icon={<Child />}
            />
          </div>
        </div>
      </div>
      <HomePageNews />
    </div>
  )
}

export default Home
