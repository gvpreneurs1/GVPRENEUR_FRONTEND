import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in local storage');
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/get-notifications/${userId}`);

        if (response.status === 201) {
          const notifications = response.data;
          setNotifications(notifications);
        }
        else {
          console.error("Failed to get notification from API");
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <strong>{notification.title}</strong> 
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetNotification;
