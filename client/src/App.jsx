import { Routes, Route } from "react-router-dom"
import "./App.scss"

import Header from "./components/other/Header"
import Footer from "./components/other/Footer"

import CatalogPage from "./components/catalog/catalog"
import AboutPage from "./components/about/About.page"
import HomePage from "./components/home/Home.page"
import ProductPage from "./components/product/Product.page"
import DashboardPage from "./components/dashboard/Dashboard.page"
import DashboardNews from "./components/dashboard/dashboardNews/DashboardNews.page"
import DashboardProductListPage from "./components/dashboard/dashboardProducts/DashboardProductList.page"
import EditProductPage from "./components/dashboard/dashboardProducts/EditProduct.page"
import AddProductPage from "./components/dashboard/dashboardProducts/AddProduct.page"
import DashboardAboutPage from "./components/dashboard/dashboardAbout/DashboardAbout.page"
import PageNotFount from "./components/other/PageNotFount"

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/catalog"
          element={<CatalogPage />}
        />
        <Route
          path="/catalog/:id"
          element={<ProductPage />}
        />
        <Route
          path="admin"
          element={<DashboardPage />}
        >
          <Route
            path="products"
            element={<DashboardProductListPage />}
          />
          <Route
            path="about"
            element={<DashboardAboutPage />}
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
