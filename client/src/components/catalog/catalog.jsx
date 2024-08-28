import { useState } from "react"

import Companies from "./companies"
import Categories from "./categories"
import Products from "./products"
import { Contacts } from "../footer"

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
        <Products filter={filter} />
      </div>
    </div>
  )
}

export default Catalog
