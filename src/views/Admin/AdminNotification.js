import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import './AdminNotification.css';

const AdminNotification = () => {
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
  });

  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    /// Retrieve adminId from local storage when the component mounts
    const storedAdminId = localStorage.getItem('adminId');
    if (storedAdminId) {
      setAdminId(storedAdminId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        'http://localhost:3005/api/send-notification',
        {
          ...notificationData,
          adminId: adminId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      if (response.status === 201) {
        const result = response.data;
        console.log('Notification sent successfully', result);
      } else {
        console.error('Cannot send notification', response.statusText);
      }
    } catch (error) {
      console.error('Error for notification creation', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section id="AdminNotification">
      <AdminNav />
      <div className="container admin-notification">
        <form onSubmit={handleSubmit} className="admin-notification-form">
          <label>
            Title:
            <input type="text" name="title" value={notificationData.title} onChange={handleChange} />
          </label>
          <label>
            Message:
            <input type="text" name="message" value={notificationData.message} onChange={handleChange} />
          </label>
          <button type="submit">Notification!</button>
        </form>
      </div>
    </section>
  );
};

export default AdminNotification;
