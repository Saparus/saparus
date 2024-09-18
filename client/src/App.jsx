import { Routes, Route } from "react-router-dom"
import "./App.scss"

import Header from "./components/other/header"
import Footer from "./components/other/footer"

import Catalog from "./components/catalog/catalog"
import About from "./components/about_us/about_us"
import Home from "./components/home/home"
import Product from "./components/product/product"
import Dashboard from "./components/dashboard/Dashboard"
import DashboardNews from "./components/dashboard/dashboardNews/DashboardNews"
import DashboardProductListPage from "./components/dashboard/dashboardProducts/DashboardProductList.page"
import EditProductPage from "./components/dashboard/dashboardProducts/EditProduct.page"
import AddProductPage from "./components/dashboard/dashboardProducts/AddProduct.page"
import PageNotFount from "./components/other/PageNotFount"

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/catalog"
          element={<Catalog />}
        />
        <Route
          path="/catalog/:id"
          element={<Product />}
        />
        <Route
          path="admin"
          element={<Dashboard />}
        >
          <Route
            path="products"
            element={<DashboardProductListPage />}
          />
          <Route
            path="news"
            element={<DashboardNews />}
          />
          <Route
            path="products/edit/:id"
            element={<EditProductPage />}
          />
          <Route
            path="products/add"
            element={<AddProductPage />}
          />
          <Route
            path="*"
            element={<PageNotFount />}
          />
        </Route>

        <Route
          path="*"
          element={<PageNotFount />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
