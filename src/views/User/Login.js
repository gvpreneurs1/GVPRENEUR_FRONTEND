import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('');

    const logo = `${process.env.PUBLIC_URL}/images/logo.png`;
    
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3005/api/login', {
            email,
            password,
            role: 'user', // Set the role to 'user' by default
          });
          localStorage.setItem('userId', response.data.userId);
      
          setAccessToken(response.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          navigate(`/get-client-course`);
          console.log(response.data);
        } catch (error) {
          // Handle login error
          console.error(error.response.data.message);
        }
      };


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
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
              </form>
            </div>
          </div>
        </div>
        
        </section>

      );
}

export default Login; 