import React from "react"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import "./index.scss"
import App from "./App"

import "./i18n"

import "react-toastify/dist/ReactToastify.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 30 * 60 * 1000, // 30 minutes
      staleTime: 30 * 60 * 1000,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
          style={{ width: "400px" }}
        />
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
