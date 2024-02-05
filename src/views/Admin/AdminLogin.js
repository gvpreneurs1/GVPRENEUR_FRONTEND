import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';


const AdminLoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/api/login', {
        email,
        password,
        role: 'admin',
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('adminId', response.data.adminId);
    

      setAccessToken(response.data.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      navigate(`/create-course`);
      /// Handle successful login response
      console.log(response.data);
    } catch (error) {
      /// Handle login error
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="row">
        <div className="col-md-6 login-card">
          <h2>Admin Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
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
  );
};

export default AdminLoginComponent;