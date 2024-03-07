import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './CreateCourseForm.css'
import AdminNav from './AdminNav';
import { Mail, MessageCircle, Link, Calendar, User, Users } from 'react-feather';

const CreateCourseForm = () => {
  const [adminId, setAdminId] = useState('');
  const [courseData, setCourseData] = useState({});

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
      const response = await axios.post('http://localhost:3005/api/create-course', {
        ...courseData,
        adminId: adminId, 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 201) {
        const result = response.data;
        console.log('Course created successfully:', result);
      } else {
        console.error('Failed to create course:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: 'flex' }}> 
    
    <AdminNav />
    
    <div className="container create-course">
    <h2>Welcome, {adminId}</h2>

    <form onSubmit={handleSubmit} className="create-course-form">
      <label >
      <div className="flex-container">
            <Mail /> Title:
          </div>
        <input type="text" name="title" value={courseData.title} onChange={handleChange} />
      </label>

      <label>     
      <div className="flex-container">  
      <MessageCircle />
        Description:
        </div>
        <textarea name="description" value={courseData.description} onChange={handleChange} />
      </label>

      <label>
      <div className="flex-container">
            <Link /> Link:
          </div>

        <input type="text" name="link" value={courseData.link} onChange={handleChange} />
      </label>

      <label>
      <div className="flex-container">
            <Calendar /> Start Date:
          </div>
        <input type="date" name="startDate" value={courseData.startDate} onChange={handleChange} />
      </label>

      <label>
      <div className="flex-container">
            <Calendar /> End Date:
          </div>
        <input type="date" name="endDate" value={courseData.endDate} onChange={handleChange} />
      </label>
    
      <label>
      <div className="flex-container">
        <Users /> Speaker:
      </div>
        <select name="speaker" value={courseData.speaker} onChange={handleChange}>
        <option value="None">None</option>
        <option value="Purna Bahadur Bista">Purna Bahadur Bista</option>
        <option value="Kiran Tamang">Kiran Tamang</option>
        <option value="Tankaman Shrestha">Tankaman Shrestha</option>
        <option value="Apsara Shrestha">Apsara Shrestha</option>
        <option value="Suman Shrestha">Suman Shrestha</option>
        <option value="Saurav Raj Giri">Saurav Raj Giri</option>
      </select>
      </label>

      <label>
        <div className="flex-container">
           <User /> Host:
        </div>
        <input type="text" name="host" value={courseData.host} onChange={handleChange} />
      </label>

      <button type="submit">Create Course</button>
    </form>
    </div>
    </div>
  );
};

export default CreateCourseForm;