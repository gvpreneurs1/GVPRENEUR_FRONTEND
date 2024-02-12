import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {

    const navigate = useNavigate();
    
    const handleNavigate = (route) => {
        navigate(route);
      };

    return (
        <div className="navbar">    
        <button onClick={() => handleNavigate('/create-course')}>Create Course</button>
        <button onClick={() => handleNavigate('/get-course')}>Get Course</button>
        <button onClick={() => handleNavigate('/admin-notification')}>Create Notification</button>
        <button onClick={() => handleNavigate('/')}>Log out</button>
        </div>
    )
}

export default AdminNav;