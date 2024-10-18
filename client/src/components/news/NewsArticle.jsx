import { Link } from "react-router-dom"

const NewsArticle = ({ title, text, date, image, id }) => {
  const renderImage = () => {
    if (image?.length < 1) return

    return (
      <div className="news-images-wrapper">
        <img
          className="news-image"
          src={image}
          alt=""
        />

        {/* {images?.length > 1 ? (
          <>
            <div className="other-images">
              {images.slice(1, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                />
              ))}
            </div>
            {images.length > 4 ? (
              <div className="smallest-images">
                {images.slice(4, 10).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )} */}
      </div>
    )
  }

  return (
    <Link
      to={`../news/${id}`}
      className="news-article"
    >
      <div className="news-title">
        <h5 className="title">{title}</h5>
        <p className="date">{date}</p>
      </div>
      <p
        className="text truncate"
        style={{ "--line-clamp": 7 }}
      >
        {text}
      </p>
      {renderImage()}
    </Link>
  )
}

export default NewsArticle
