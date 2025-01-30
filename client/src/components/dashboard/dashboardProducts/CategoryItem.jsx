import { ReactComponent as XMarkIcon } from "../../../assets/icons/xmark.svg"
import { ReactComponent as PenIcon } from "../../../assets/icons/pen.svg"

export const CategoryItem = ({ value, removeCategory, editCategory }) => {
  const valueToShow = Object.values(value || {})?.find((value) => value?.name)?.name

  const result = Object.entries(value || {})?.find(([key, value]) => value?.name)

  const category = result[0]
  const name = result[1].name

  return (
    <div className="category-item">
      <div className="category-item-text">
        <p className="category-type-key">{`${category} |`}</p>
        <p className="category-value">{name}</p>
      </div>
      <button onClick={removeCategory}>
        <XMarkIcon className="icon" />
      </button>
      <button onClick={editCategory}>
        <PenIcon className="icon edit-icon" />
      </button>
    </div>
  )
}

export default CategoryItem
