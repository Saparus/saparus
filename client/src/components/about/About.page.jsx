import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

import { Contacts } from "../other/Footer"
import { getAllAboutItems } from "../../services/aboutServices"

import Loading from "../other/Loading"
import Map from "../other/Map"

const About = () => {
  const { t } = useTranslation("translation", { keyPrefix: "about us" })
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const { data, isLoading, error } = useQuery(["about", currentLanguage], () =>
    getAllAboutItems(currentLanguage)
  )

  const [loadedImages, setLoadedImages] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  const renderContent = () => {
    if (isLoading) return <Loading />

    if (!data || error) return <div>something went wrong</div>

    return data.aboutItems.map((aboutItem) => {
      const { id, title, text, image } = aboutItem

      return (
        <div
          key={id}
          className="parts"
        >
          <div className="centered">
            {loadedImages[id] ? "" : <Loading />}
            <div
              className="information"
              style={{ display: loadedImages[id] ? "block" : "none" }} // show only when image is loaded
            >
              <h2 className="about-information-title">{title}</h2>
              <p className="about-information-text">{text}</p>
            </div>
            <div className="image">
              <img
                src={image}
                alt=""
                loading="eager" // enables lazy loading
                onLoad={() => handleImageLoad(id)} // mark image as loaded
                onError={() => handleImageLoad(id)} // handle broken images
                style={{ display: loadedImages[id] ? "block" : "none" }}
              />
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="about_us page">
      <div className="parts first">
        <div className="centered">
          <Map />
          <Contacts />
        </div>
      </div>
      {renderContent()}
    </div>
  )
}

export default About
