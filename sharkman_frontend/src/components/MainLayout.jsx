import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


function MainLayout(props) {
  return (
    <div>
      <Navbar/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default MainLayout
