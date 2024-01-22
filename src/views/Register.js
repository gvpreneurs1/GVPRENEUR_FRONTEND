import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    mobile: '',
    role: 'user',
  });

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

  return (
    <section id="Register">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmitForm}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Registration Modal"
      >
        <h2>Verify OTP</h2>
        <label>
          OTP:
          <input type="text" name="otp" value={otpData.otp} onChange={handleOtpChange} />
        </label>
        <br />
        <button type="button" onClick={handleSubmitOtp}>
          Verify OTP
        </button>
      </Modal>
    </section>
  );
}

export default Register;
