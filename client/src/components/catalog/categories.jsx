import { useState } from "react"

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg"

import { categories } from "../products"

const Categories = ({ setFilter }) => {
  const used_categories = ["company", "type", "price"]
  const [inputValue, setInputValue] = useState({})

  const handleInputChange = (event) => {
    const { name: category, value } = event.target
    setInputValue((filter) => ({ ...filter, [category]: value }))
  }

  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(inputValue)
  }

  return (
    <form
      className="categories"
      onSubmit={handleFilter}
    >
      <input
        name="name"
        className="input category"
        type="text"
        value={inputValue.name || ""}
        onChange={handleInputChange}
        placeholder="search by name"
      />

      {used_categories.map((category, index) => {
        const options = categories(category) || []
        return (
          <select
            key={index}
            className="select category"
            name={category}
            value={inputValue[category] || ""}
            onChange={handleInputChange}
          >
            <option
              defaultValue
              disabled
              value=""
            >
              {category}
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        )
      })}

      <div className="utils">
        <button
          className="search-button"
          type="submit"
        >
          Search
        </button>
        <button
          className="trash-button"
          onClick={() => setInputValue({})}
        >
          <TrashIcon />
        </button>
      </div>
    </form>
  )
}

export default Categories
