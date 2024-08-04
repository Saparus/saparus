import { useQuery } from "react-query"

import HeroLink from "./HeroLink"
import NewsItem from "./NewsItem"

// import { ReactComponent as Logo } from "../../assets/logo.svg"
import { ReactComponent as LogoIcon } from "../../assets/logo_white.svg"
import { ReactComponent as CatalogIcon } from "../../assets/icons/catalog.svg"
import { ReactComponent as Child } from "../../assets/icons/child.svg"

import { getAllNews } from "../../data/news"
import { Link } from "react-router-dom"

const Home = () => {
  const { data: news, isLoading, error } = useQuery("news", getAllNews)

  const renderNews = () => {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching news</div>

    return (
      <section className="home-page-news">
        <h2>News</h2>
        <div className="news">
          <Link
            to="/news/0"
            className="latest-news"
          >
            <div className="image">
              <img
                src={news[0].image}
                alt={news[0].title}
              />
              <div className="latest-news-information">
                <h4 className="title">{news[0].title}</h4>
                <p
                  className="description truncate"
                  style={{ "--line-clamp": 3 }}
                >
                  {news[0].text}
                </p>
              </div>
            </div>
          </Link>
          <div className="news-list">
            {news.slice(1).map((newsItem) => (
              <NewsItem
                title={newsItem.title}
                text={newsItem.text}
                url={`/news/${newsItem.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

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
      {renderNews()}
    </div>
  )
}

export default Home
