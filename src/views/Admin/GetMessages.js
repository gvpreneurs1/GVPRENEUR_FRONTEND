import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';

const GetMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/get-message/');
        setMessages(response.data.messages);
      } catch (error) {
        setError('Error fetching data from the server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
        <AdminNav />
      <h1>Course List</h1>
      <ul>
        {messages.map(messages => (
          <li key={messages.id}>
            <strong>Title:</strong> {messages.name}<br />
            <strong>Description:</strong> {messages.email}<br />
            <strong>Link:</strong> {messages.message}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetMessages;