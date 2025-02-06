import { useTranslation } from "react-i18next"

const CategoryList = ({ categories }) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  if (!categories) return ""

  console.log(categories)

  return (
    <div className="category-list">
      {categories.map(({ key, value, name }, index) => (
        <div
          key={key}
          className="category-item"
        >
          <strong>{name[currentLanguage] + "\u00A0"} </strong> | {value[currentLanguage]}
        </div>
      ))}
    </div>
  )
}

export default CategoryList
