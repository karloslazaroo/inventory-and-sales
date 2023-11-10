import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Product from "./pages/Product/Product.jsx"
import Payment from "./pages/Payment/Payment.jsx"
import Sales from "./pages/Sales/Sales.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "product",
    element: <Product/>,
  },
  {
    path: "payment",
    element: <Payment/>,
  },
  {
    path: "sales",
    element: <Sales/>,
  },

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
