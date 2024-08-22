import { Contacts } from "../footer"
import Map from "../map"

import aboutImage1 from "../../assets/about_images/about1.png"
import aboutImage2 from "../../assets/about_images/about2.png"

const About = () => {
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
            <h2>Origins of Saparus</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas
              minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda
              excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa!
              Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem
              amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus
              doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi
              asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint
              possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus
              consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam
              labore!
            </p>
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
            <h2>Our Values</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas
              minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda
              excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa!
              Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem
              amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus
              doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi
              asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint
              possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus
              consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam
              labore!
            </p>
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
