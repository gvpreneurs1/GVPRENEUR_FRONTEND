import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import './Register.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Footer from '../../components/Footer/Footer';
Modal.setAppElement('#root');


const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    mobile: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [otpData, setOtpData] = useState({
    otp: '',
  });

  // Declare backendOtp state
  const [backendOtp, setBackendOtp] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpData({
      otp: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send details to /api/send-otp to get OTP
      const responseSendOtp = await axios.post('http://localhost:3005/api/send-otp', {
        email: formData.email,
      });

      console.log(responseSendOtp.data);

      // Save OTP from the backend to state
      setBackendOtp(responseSendOtp.data.otp);

      // Step 2: Display success toast
      toast.success('OTP sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Save form data and open modal
      setModalIsOpen(true);
    } catch (error) {
      console.error('Sending OTP failed', error);

      // Display error toast for sending OTP failure
      toast.error('Sending OTP failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmitOtp = async () => {
    try {
      // Step 3: Compare OTP in the modal
      const isOtpValid = otpData.otp === backendOtp;

      if (isOtpValid) {
        // Step 4: If OTP is valid, proceed to /api/register
        const responseRegister = await axios.post('http://localhost:3005/api/register', formData);
        console.log(responseRegister.data);

        // Display success toast for registration
        toast.success('Registration successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Close modal after successful registration
        setModalIsOpen(false);
      } else {
        // Display error toast for incorrect OTP
        toast.error('Incorrect OTP. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Registration process failed', error);

      // Display error toast for registration failure
      toast.error('Registration process failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleLogin = async () => {
    navigate(`/client-login`);
  }

  return (
<section id="Register" className="registration-section">
      <div className="container">
        <Box
      component="form"
      onSubmit={handleSubmitForm}
      sx={{
        '& > :not(style)': { mb: 3 },
        maxWidth: '400px', // Adjust the width as needed
        margin: 'auto', // Center the form
      }}
      noValidate
      autoComplete="off"
      className='Registration-Form'
    >
        <h1>Registration Form</h1>

      <TextField
        id="username"
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="password"
        value={formData.password}
        onChange={handleChange}
        type="password"
      />
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        id="mobile"
        label="Mobile"
        variant="outlined"
        fullWidth
        margin="normal"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >
        Register
      </Button>
      <Button type="button" variant="contained" color="secondary" onClick={handleLogin} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
        Back to Login
      </Button>
      </Box>


        <ToastContainer />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Registration Modal"
        >
          <h2>Verify OTP</h2>
          <div className="mb-3">
            <label htmlFor="otp">OTP:</label>
            <input type="text" className="form-control" name="otp" value={otpData.otp} onChange={handleOtpChange} />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSubmitOtp}>
            Verify OTP
          </button>
        </Modal>
        </div>
        <Footer/>
    </section>
  );
}

export default Register;
