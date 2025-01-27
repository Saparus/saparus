import { useState } from "react"

import Companies from "./companies"
import Categories from "./categories"
import Products from "./ProductList"

const Catalog = () => {
  const [filter, setFilter] = useState({})

  console.log(filter)

  return (
    <div className="page catalog">
      <Companies
        setFilter={setFilter}
        selectedCompany={filter?.categories?.company}
      />
      <div className="products-categories">
        <Categories
          selectedCompany={filter?.categories?.company}
          filter={filter}
          setFilter={setFilter}
        />
        <Products
          filter={filter}
          resetFilter={(event) => {
            event.preventDefault()
            setFilter({})
          }}
        />
      </div>
    </div>
  )
}

export default Catalog
