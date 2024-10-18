import { useEffect, useState } from "react"

import Companies from "./companies"
import Categories from "./categories"
import Products from "./ProductList"

const Catalog = () => {
  const [filter, setFilter] = useState({})

  return (
    <div className="page catalog">
      <Companies
        setFilter={setFilter}
        selectedCompany={filter.company}
      />
      <div className="products_categories">
        <Categories setFilter={setFilter} />
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
