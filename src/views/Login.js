import React, { useState } from 'react';
import './Login.css'
import { MDBContainer,  MDBRow,  MDBCol,} from 'mdb-react-ui-kit';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:3005/api/login', {
            email,
            password,
            role: 'user', // Set the role to 'user' by default
          });
    
          // Handle successful login response
          console.log(response.data);
        } catch (error) {
          // Handle login error
          console.error(error.response.data.message);
        }
      };


    return (
        

          <div className="col-md-6">
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
    )
}

export default Login; 