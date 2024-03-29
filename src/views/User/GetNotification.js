import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientNav from './ClientNav';
import Footer from '../../components/Footer/Footer';

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
          const { messages, ID, title } = response.data;

          /// Check if messages is an array before setting the state
          if (Array.isArray(messages)) {
            const notificationsData = messages.map((message, index) => ({
              ID: ID[index],
              message,
              title: title[index],
            }));
            setNotifications(notificationsData);
          } else {
            console.error('Invalid format for notifications:', messages);
          }
        } else {
          console.error("Failed to get notification from API");
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (notificationId) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.delete(`http://localhost:3005/api/delete-notifications/${userId}/${notificationId}`);

      if (response.status === 201) {
        // If the deletion is successful, update the state to reflect the changes
        setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.ID !== notificationId));
      } else {
        console.error("Failed to delete notification");
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <section> 
    <ClientNav />
    <div className="container mt-4">
      
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="row">
        {notifications.map((notification) => (
          <div key={notification.ID} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="bg-white p-4 rounded shadow-md">
              <p>
                <strong>ID:</strong> {notification.ID}
              </p>
              <p>
                <strong>Title:</strong> {notification.title}
              </p>
              <p>
                <strong>Message:</strong> {notification.message}
              </p>
              <button
                onClick={() => handleDelete(notification.ID)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </section>
  );
};

export default GetNotification;
