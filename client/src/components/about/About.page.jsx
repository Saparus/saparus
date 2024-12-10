import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

import { Contacts } from "../other/Footer"

import { getAllAboutItems } from "../../services/aboutServices"

import Loading from "../other/Loading"

import Map from "../other/Map"

const About = () => {
  const { t } = useTranslation("translation", { keyPrefix: "about us" })
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const { data, isLoading, error } = useQuery(["about", currentLanguage], () =>
    getAllAboutItems(currentLanguage)
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const renderContent = () => {
    if (isLoading) return <Loading />

    if (!data || error) return <div>something went wrong</div>

    return data.map((aboutItem) => {
      const { id, title, text, image } = aboutItem

      return (
        <div
          key={id}
          className="parts"
        >
          <div className="centered">
            <div className="information">
              <h2 className="about-information-title">{title}</h2>
              <p className="about-information-text">{text}</p>
            </div>
            <div className="image">
              <img
                src={image}
                alt=""
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
