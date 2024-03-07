import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('');

    const logo = `${process.env.PUBLIC_URL}/images/logo.png`;

    useEffect(() => {
      // Start of Tawk.to Script
      const tawkScript = document.createElement('script');
      tawkScript.type = 'text/javascript';
      tawkScript.async = true;
      tawkScript.src = 'https://embed.tawk.to/65ddc1ca9131ed19d9722222/1hnl3q028';
      tawkScript.charset = 'UTF-8';
      tawkScript.setAttribute('crossorigin', '*');
  
      // Append the script to the document body
      document.body.appendChild(tawkScript);
  
      // Cleanup function to remove the script when the component is unmounted
      return () => {
        document.body.removeChild(tawkScript);
      };
      // End of Tawk.to Script
    }, []); 

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3005/api/login', {
            email,
            password,
            role: 'user', // Set the role to 'user' by default
          });
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('accessToken', response.data.accessToken);
          setAccessToken(response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          navigate(`/get-client-course`);
          console.log(response.data);
        } catch (error) {
          // Handle login error
          console.error(error.response.data.message);
        }
      };

      const handleRegister = () => {
        navigate(`/register`)
      }

      return (
        <section id='User-Login'>
        <nav className="logo-placeholder">
                <img src={logo} alt="logo" />
        </nav>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 login-form">
            <h1>Login App</h1> 
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-button'>
                <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                 onClick={handleLogin}>Login
                 </button>
                <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleRegister}>Register
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
        </section>

      );
}

export default Login; 