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
import DashboardProducts from "./components/dashboard/dashboardProducts/DashboardProducts"
import DashboardProductEdit from "./components/dashboard/dashboardProducts/DashboardProductEdit"
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
          path="dashboard"
          element={<Dashboard />}
        >
          <Route
            path="products"
            element={<DashboardProducts />}
          />
          <Route
            path="news"
            element={<DashboardNews />}
          />
          <Route
            path="products/edit/:id"
            element={<DashboardProductEdit mode="edit" />}
          />
          <Route
            path="products/edit"
            element={<DashboardProductEdit mode="add" />}
          />
        </Route>

        <Route
          path="admin"
          element={<Dashboard />}
        >
          <Route
            path="products"
            element={<DashboardProducts />}
          />
          <Route
            path="news"
            element={<DashboardNews />}
          />
          <Route
            path="products/edit/:id"
            element={<DashboardProductEdit mode="edit" />}
          />
          <Route
            path="products/edit"
            element={<DashboardProductEdit mode="add" />}
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
