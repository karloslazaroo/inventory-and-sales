import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>

       <ul className="App-header">
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/payment">Payment</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
