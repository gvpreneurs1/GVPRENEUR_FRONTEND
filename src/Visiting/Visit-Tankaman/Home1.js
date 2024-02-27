import React, { useState } from "react";
import './Home1.css';
import { PhoneCall } from 'react-feather';
import { MapPin } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEye, faCheck, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faMapMarker, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';



function Home1() {
    const theme = `${process.env.PUBLIC_URL}/images/theme.jpg`;
    const tankaman = `${process.env.PUBLIC_URL}/images/tankaman.jpg`;
    const vCardFile = `${process.env.PUBLIC_URL}/vcf/Tankaman_S.vcf`;
    const [url, setUrl] = useState(window.location.href);

    const handleDownloadClick = () => {
        const link = document.createElement('a');
        link.href = vCardFile;
        link.download = 'Tankaman_S.vcf';

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };

    const handleShareClick = () => {
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);

        // Select the text in the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        // Provide some visual feedback (optional)
        alert('URL copied to clipboard: ' + url);
    };

    return (
        <div className="Home1">
            <div style={{
                backgroundImage: `url(${theme})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: '#fff',
                position: '',
                height: '700px',
            }}>
                <div class="view_counter">
                    <span><FontAwesomeIcon icon={faEye} />  View: 2956</span>
                </div>
                <div className="Profile">
                    <img src={tankaman} alt="tankaman" />
                </div>
                <div className="home1Text">
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ display: 'inline' }}>
                            Tankaman Shrestha </h2>
                        <span style={{ backgroundColor: 'blue', color: 'white', padding: '5px', borderRadius: '50%', marginLeft: '5px', padding: '5px' }}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                    </div>
                    <p>Tankaman Shrestha</p>
                    <p> Global Victors Senior Superior</p>
                    <div className="contact_button">
                        <ul className="nav-list d-flex flex-wrap">
                            <li className='col-12 col-md-auto'>
                                <a href="/" className="nav-link">
                                    <FontAwesomeIcon icon={faPhone} /> Call
                                </a>
                            </li>
                            <li className='col-12 col-md-auto'>
                                <a href="/about-us" className="nav-link">
                                    <FontAwesomeIcon icon={faWhatsapp} /> Whatsapp
                                </a>
                            </li>
                            <li className='col-12 col-md-auto'>
                                <a href="/service" className="nav-link">
                                    <FontAwesomeIcon icon={faMapMarker} /> Direction
                                </a>
                            </li>
                            <li className='col-12 col-md-auto'>
                                <a href="/blog" className="nav-link">
                                    <FontAwesomeIcon icon={faEnvelope} /> Mail
                                </a>
                            </li>
                            <li className='col-12 col-md-auto'>
                                <a href="/contact" className="nav-link">
                                    <FontAwesomeIcon icon={faGlobe} /> Website
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="Card-Group">
                    <div className="Card-Contact">
                        <PhoneCall size={24} color="blue" />
                        <span style={{ marginLeft: '10px' }}>Call me</span>
                    </div>
                    <div className="Card-Contact">
                        <MapPin size={24} color="blue" />
                        <span style={{ marginLeft: '10px' }}>Kathmandu, Kalimati</span>
                    </div>
                </div>
                <div className="Whatsapp">
                    <input placeholder="Enter Whatsapp number"></input>
                    <button><a href="https://call.whatsapp.com/voice/ACFtxfZPvWYuxF0TRKmk8Z" target="_blank">  <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</a></button>
                </div>
                <div className="Contacts-Share">

                    <button onClick={handleDownloadClick} style={{ padding: '10px', marginRight: "10px", textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faDownload} /> Save to Contacts
                    </button>
                    <button onClick={handleShareClick}>
                        <FontAwesomeIcon icon={faShare} /> Share
                    </button>
                </div>

                <div className="social-media">
                    <a href="https://www.facebook.com/gvpreneur1" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.youtube.com/@tmscreationtankamanshresth5928" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="https://www.instagram.com/tanka_man_/" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>

            </div>
        </div>
    )
}


export default Home1;