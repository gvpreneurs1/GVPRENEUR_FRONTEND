import React from 'react'

import Newsletter from './Newsletter.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer py-5' style={{ backgroundColor: '#F2F6FF' }}>
      <div className="container">
        <div className="footer-content row">
          <div className="col-md-3 px-3 first-section">
            <div className="block-header text-capitalize">
              <h3>Contact Us</h3>
            </div>
            <address><a target='/' href='https://www.google.com/maps/place/Global+Victors/@27.6960121,85.2778433,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1901c1264855:0xb93db1ec2e63d3ee!8m2!3d27.6960121!4d85.2804182!16s%2Fg%2F11l70prs54?entry=ttu'> Kalanki, Kathmandu </a> </address>
            <a href="mailto:quotes@gsbondcleaning.com.au">gvpreneurs1@gmail.com</a>
          </div>
          <div className="col-md-3 px-3">
            <div className="block-header text-capitalize">
              <h3>Our Sections</h3>
            </div>
            <div className="list-holder">
              <ul className="link-list text-capitalize">
                <li>home</li>
                <li>Course</li>
                <li>notification</li>
                <li>Contact us</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 px-3">
            <div className="block-header text-capitalize">
              <h3>Our Socials</h3>
            </div>
            <div className="social-media">
                    <a href="https://www.facebook.com/gvpreneur1" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.youtube.com/@GVPreneurs" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="https://www.instagram.com/gvpreneur/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
          </div>
          <div className="col-md-3 px-3">
            <Newsletter />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer