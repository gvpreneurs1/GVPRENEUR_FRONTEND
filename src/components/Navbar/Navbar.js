import React from 'react'

import './Navbar.scss'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <nav id='main-nav' className='col-12 d-flex flex-wrap align-items-center justify-content-between py-md-2'>
          <div className="list-holder col-12 col-md-auto mb-2 mb-md-0">
            <ul className="nav-list d-flex flex-wrap">
              <li className='col-12 col-md-auto'>
                <a href="/" className="nav-link">Home</a>
              </li>
              <li className='col-12 col-md-auto'>
                <a href="/about-us" className="nav-link">About Us</a>
              </li>
              <li className='col-12 col-md-auto'>
                <a href="/service" className="nav-link">Services</a>
              </li>
              <li className='col-12 col-md-auto'>
                <a href="/blog" className="nav-link">Blog</a>
              </li>
              <li className='col-12 col-md-auto'>
                <a href="/contact" className="nav-link">Contact Us</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar