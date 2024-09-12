import { useState } from "react"

import ProductList from "./ProductList"
import Categories from "../../catalog/categories"

const DashboardProducts = () => {
  const [filter, setFilter] = useState({})

  return (
    <div className="dashboard-products">
      <Categories setFilter={setFilter} />
      <ProductList
        filter={filter}
        resetFilter={(event) => {
          event.preventDefault()
          setFilter({})
        }}
      />
    </div>
  )
}

export default DashboardProducts
