import React from 'react';
import point from './img/point.jpg';
import './CSS/navbar.css';
import { motion } from 'framer-motion';
import bottom from './/img/bottom.png'

export const leftVariants = {
    hidden: {
        x: 200,
        overflow: "hidden",
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: "20",
            velocity: "1",
        },
    },
};

function First() {
    return (
        <section id="hero-section">
            <div className="container">
                <div className="row">
                    <div className="col-7 text-section">
                        <h1 className="overlay-heading">Elevate Your Entrepreneurial Journey with
                            <span className='Gvprenuer mr-2'> GVPRENUER </span> </h1>
                        <p className="overlay-paragraph">Unlock your entrepreneurial potential with our tailored teaching approach.
                        </p>
                        <div className="hover1">
                            <button>Register now </button>
                            <button>Find Course  </button>
                        </div>
                    </div>
                    <motion.div className="point col-5 "
                        initial="hidden" animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05, transition: { duration: 1 }, }}
                        viewport={{ once: true }} whileInView={'visible'} variants={leftVariants}>
                        <img src={point} alt="point" />

                    </motion.div>

                </div>

            </div>
        </section>
    )
}

export default First;