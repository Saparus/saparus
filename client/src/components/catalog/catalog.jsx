import { useState } from "react"

import Companies from "./companies"
import Categories from "./categories"
import Products from "./products"

function Catalog() {
  const [filter, setFilter] = useState({})

  return (
    <div className="page catalog">
      <Companies setFilter={setFilter} />
      <div className="products_categories">
        <Categories setFilter={setFilter} />
        <Products filtered={filter} />
      </div>
    </div>
  )
}

export default Catalog
