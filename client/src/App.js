import { Routes, Route } from "react-router-dom"
import "./App.scss"

import Nav from "./components/nav"
import Footer from "./components/footer"

import Catalog from "./components//catalog/catalog"
import About from "./components/about_us/about_us"
import Home from "./components/home/home"
import Product from "./components/product/product"
import PageNotFount from "./components/page_not_found/PageNotFount"

function App() {
  return (
    <div className="app">
      <Nav />
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
          path="*"
          element={<PageNotFount />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
