import React from 'react'

import Newsletter from './Newsletter.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Mail } from 'react-feather';
import './Footer.css'


const Footer = () => {
  const logo = `${process.env.PUBLIC_URL}/images/logo.png`;
  return (
    <footer className='footer py-5' style={{ backgroundColor: '#F2F6FF' }}>
      <div className="container">
        <div className="footer-content row">
        <div className="col-md-3 px-3 flex flex-col items-start">
        <div className="flex items-center">
          <img className="h-8 w-auto" src={logo} alt="Your Company" style={{ height: '45px' }} />
          <h2 className="ml-2">Gvpreneur</h2>
        </div>
        <span>
          Led by visionary G.V leaders, this initiative offers transformative programs designed to enhance essential business skills, fostering a community of growth and success.
        </span>
        </div>
          <div className="col-md-3 px-3 first-section">
            <div className="block-header text-capitalize">
              <h3>Contact Us</h3>
            </div>
            <div className='flex gap-1'>
            <MapPin /> <address><a target='/' href='https://www.google.com/maps/place/Global+Victors/@27.6960121,85.2778433,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb1901c1264855:0xb93db1ec2e63d3ee!8m2!3d27.6960121!4d85.2804182!16s%2Fg%2F11l70prs54?entry=ttu'> Kalanki, Kathmandu </a> </address>
            </div>
            <div className='flex gap-1'>
              <Mail />
            <a href="mailto:quotes@gsbondcleaning.com.au">gvpreneurs1@gmail.com</a>
            </div>
          </div>
         
          <div className="col-md-3 px-3">
            <div className="block-header text-capitalize">
              <h3>Our Socials</h3>
            </div>
            <div className="social-media">
                    <div className='social-media-facebook'> 
                    <a href="https://www.facebook.com/gvpreneur1" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <span><a href="https://www.facebook.com/gvpreneur1" target="_blank">Facebook</a></span>
                    </div>
                    <div className='social-media-youtube'>
                    <a href="https://www.youtube.com/@GVPreneurs" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <span><a href="https://www.youtube.com/@GVPreneurs" target="_blank">Youtube</a></span>
                    </div>
                    <div className='social-media-instagram'>
                    <a href="https://www.instagram.com/gvpreneur/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <span><a href="https://www.instagram.com/gvpreneur/" target="_blank">Instagram</a></span>
                    </div>
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