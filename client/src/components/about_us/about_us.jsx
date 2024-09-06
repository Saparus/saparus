import { Contacts } from "../other/footer"
import { useTranslation } from "react-i18next"

import aboutImage1 from "../../assets/about_images/about1.png"
import aboutImage2 from "../../assets/about_images/about2.png"

import Map from "../other/map"

const About = () => {
  const { t } = useTranslation("translation", { keyPrefix: "about us" })

  return (
    <div className="about_us page">
      <div className="parts first">
        <div className="centered">
          <Map />
          <Contacts />
        </div>
      </div>
      <div className="parts second">
        <div className="centered">
          <div className="information">
            <h2>{t("Origins of Saparus")}</h2>
            <p>{t("origins of saparus text")}</p>
          </div>
          <img
            src={aboutImage1}
            alt=""
          />
        </div>
      </div>
      <div className="parts third">
        <div className="centered">
          <div className="information">
            <h2>{t("Our Values")}</h2>
            <p>{t("our values text")}</p>
          </div>
          <img
            src={aboutImage2}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default About
