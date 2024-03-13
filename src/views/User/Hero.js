import React from 'react'
import { useState } from 'react'
import ClientNav from './ClientNav';
import './Hero.css';
const background = `${process.env.PUBLIC_URL}/images/hero-background.jpg`;



 const Hero = () => {
  const parallaxStyle = {
    backgroundImage: `url(${background})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    position: 'relative'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  return (
    <section id='Hero-section' style={parallaxStyle}>
       <div style={overlayStyle}>
    <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:py-48 lg:py-56">
          <div className="text-center hero-text">
          <h1 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
  Success Through Knowledge and Integrity
</h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform lives through authentic products and proven sales techniques with GVPRENEUR.
             Empowering thousands to achieve financial well-being and personal growth.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Hero;