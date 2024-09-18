import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg"

import { categories } from "../../data/products"

const Categories = ({ setFilter, showAddNewProductButton = false }) => {
  const used_categories = ["company", "type", "price"]
  const [inputValue, setInputValue] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()

  const handleInputChange = (event) => {
    const { name: category, value } = event.target
    setInputValue((filter) => ({ ...filter, [category]: value }))
  }

  const handleFilter = (event) => {
    event.preventDefault()
    setFilter(inputValue)

    goToPage(1)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage })
    scrollToTop()
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
          className="button search-button "
          type="submit"
        >
          Search
        </button>
        <button
          className="button trash-button "
          onClick={() => setInputValue({})}
        >
          <TrashIcon />
        </button>
      </div>

      {showAddNewProductButton ? (
        <div className="utils">
          <Link
            className="button"
            to="../../admin/products/add"
          >
            Add New Product
          </Link>
        </div>
      ) : (
        ""
      )}
    </form>
  )
}

export default Categories
