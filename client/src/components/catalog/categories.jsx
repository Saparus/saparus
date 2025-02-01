import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg"

import { getCategories } from "../../services/categoryServices"

import PriceSlider from "./PriceSlider"
import Loading from "../other/Loading"

const Categories = ({ selectedCompany, setFilter, showAddNewProductButton = false }) => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language

  const { t } = useTranslation("translation", { keyPrefix: "products" })

  // const used_categories = ["company", "type", "price"]
  const [inputValue, setInputValue] = useState({})
  const [defaultPriceExtremum, setDefaultPriceExtremum] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()

  const { data, isLoading, error } = useQuery(["categories"], getCategories, {
    onSuccess: (fetchedData) => {
      const { minPrice, maxPrice } = fetchedData

      if (minPrice == null || maxPrice == null || inputValue.minPrice || inputValue.maxPrice) return

      setInputValue((prevState) => ({ ...prevState, minPrice, maxPrice }))
      setDefaultPriceExtremum({ minPrice, maxPrice })
    },
  })

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

  useEffect(() => {
    if (data) {
      const { minPrice, maxPrice } = data

      // check if minPrice or maxPrice are not already set
      if (minPrice != null && maxPrice != null && !inputValue.minPrice && !inputValue.maxPrice) {
        setInputValue((prevState) => ({
          ...prevState,
          minPrice,
          maxPrice,
        }))
        setDefaultPriceExtremum({ minPrice, maxPrice })
      }
    }
  }, [data])

  useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        company: selectedCompany === "All" ? "" : selectedCompany,
      },
    }))
  }, [selectedCompany])

  const renderCategories = () => {
    if (isLoading) return <Loading />
    if (error || !data) {
      console.log(error)
      return <div>something went wrong</div>
    }

    const categories = transformCategories(data.categories)

    const handleOnSelect = (event) => {
      const { name, value } = event.target

      if (name === "company") {
        setInputValue((prev) => ({
          ...prev,
          categories: {
            ...prev.categories,
            company: value === "All" ? "" : value,
          },
        }))
      } else {
        setInputValue((prev) => ({
          ...prev,
          categories: {
            ...prev.categories,
            [name]: value === "All" ? "" : value,
          },
        }))
      }
    }

    const { minPrice, maxPrice } = data

    const priceOptions = []
    for (let i = minPrice; i <= maxPrice; i += 100) {
      priceOptions.push(i)
    }

    const renderCategorySelect = (category) => {
      const { key, subKeys, values } = category

      // check if all amounts are 0
      if (values.every((category) => category?.[currentLanguage]?.amount === 0)) {
        return null
      }

      if (!Object.keys(subKeys).includes(currentLanguage)) return

      return (
        <div
          className="select-holder"
          key={key}
        >
          <select
            id={`select-${key}`}
            className="select category"
            name={key}
            value={inputValue.categories?.[key] || ""}
            onChange={handleOnSelect}
          >
            <option
              defaultValue
              disabled
              value=""
            >
              {subKeys[currentLanguage]}
            </option>
            <option value="All">{t("All")}</option>
            {values.map((category, index) => {
              if (category?.[currentLanguage]?.amount === 0 || !category?.[currentLanguage]?.name)
                return null

              return (
                <option
                  key={`${category?.[currentLanguage]?.name}-${index}`}
                  value={category?.[currentLanguage]?.name}
                >
                  {category?.[currentLanguage]?.name}
                </option>
              )
            })}
          </select>
        </div>
      )
    }

    return (
      <>
        {categories.map((category) => renderCategorySelect(category))}
        {/* {renderCompanySelect()} */}
      </>
    )
  }

  const renderPriceRanges = () => {
    if (isLoading) return
    if (error || !data) return

    const { minPrice, maxPrice } = data

    const priceOptions = []
    for (let i = minPrice; i <= maxPrice; i += 100) {
      priceOptions.push(i)
    }

    if (maxPrice === minPrice || maxPrice === 0) return

    const handleMinPriceChange = (event) => {
      const value = Number(event.target.value)
      const newMinPrice = Math.min(value, inputValue.maxPrice || maxPrice)
      const fivePercentDiff = Math.ceil((maxPrice - minPrice) * 0.1)

      setInputValue((prev) => ({
        ...prev,
        minPrice: Math.min(newMinPrice, prev.maxPrice - fivePercentDiff),
      }))
    }

    const handleMaxPriceChange = (event) => {
      const value = Number(event.target.value)
      const newMaxPrice = Math.max(value, inputValue.minPrice || minPrice)
      const fivePercentDiff = Math.ceil((maxPrice - minPrice) * 0.1)

      setInputValue((prev) => ({
        ...prev,
        maxPrice: Math.max(newMaxPrice, prev.minPrice + fivePercentDiff),
      }))
    }

    return (
      <PriceSlider
        handleMinPriceChange={handleMinPriceChange}
        handleMaxPriceChange={handleMaxPriceChange}
        maxPrice={maxPrice}
        minPrice={minPrice}
        currentMaxPrice={inputValue.maxPrice || maxPrice}
        currentMinPrice={inputValue.minPrice || minPrice}
        t={t}
      />
    )
  }

  return (
    <form
      className="categories"
      onSubmit={handleFilter}
    >
      <div className="categories-main-part">
        <input
          name="name"
          className="input category"
          type="text"
          value={inputValue.name || ""}
          onChange={handleInputChange}
          placeholder={t("search by name")}
        />
        <div className="categories-list-select">{renderCategories()}</div>
      </div>
      {renderPriceRanges()}

      <div className="utils">
        <button
          className="button search-button "
          type="submit"
        >
          {t("Search")}
        </button>
        <button
          className="button trash-button "
          onClick={() =>
            setInputValue((prevState) => ({
              minPrice: defaultPriceExtremum.minPrice,
              maxPrice: defaultPriceExtremum.maxPrice,
            }))
          }
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
            {t("Add New Product")}
          </Link>
        </div>
      ) : (
        ""
      )}
    </form>
  )
}

export default Categories

export const transformCategories = (input) => {
  const languages = Object.keys(input)
  const result = []

  languages.forEach((lang) => {
    const categories = input[lang]
    Object.keys(categories).forEach((categoryKey) => {
      const category = categories[categoryKey]
      let existingCategory = result.find((item) => item.key === categoryKey)

      if (!existingCategory) {
        existingCategory = {
          key: categoryKey,
          subKeys: {},
          values: [],
        }
        result.push(existingCategory)
      }

      existingCategory.subKeys[lang] = category.name

      category.values.forEach((value, index) => {
        if (!existingCategory.values[index]) {
          existingCategory.values[index] = {}
        }
        existingCategory.values[index][lang] = { name: value.name, amount: value.amount }
      })
    })
  })

  return result
}
