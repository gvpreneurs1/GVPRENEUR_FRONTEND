import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import './GetCourse.css';

const GetCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Tankaman1 = `${process.env.PUBLIC_URL}/images/Tankaman1.png`;
  const Apsara = `${process.env.PUBLIC_URL}/images/Apsara.jpg`;
  const Kiran = `${process.env.PUBLIC_URL}/images/Kiran.png`;
  const Purna = `${process.env.PUBLIC_URL}/images/Purna.png`;
  const Suman = `${process.env.PUBLIC_URL}/images/Suman.png`;
  const Saurav = `${process.env.PUBLIC_URL}/images/Saurav.jpg`;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/get-course/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
        );
        
        if (response.status === 201) {
          const { course } = response.data;
          setCourseData(course);
        } else {
          console.error('Failed to fetch course details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/course/${id}`);
  };

  const getSpeakerPhoto = (speaker) => {
    switch (speaker) {
      case 'Purna Bahadur Bista':
        return Purna;
      case 'Kiran Tamang':
        return Kiran;
      case 'Tankaman Shrestha':
        return Tankaman1;
      case 'Apsara Shrestha':
        return Apsara;
      case 'Suman Shrestha':
        return Suman;
      case 'Saurav Raj Giri':
        return Saurav;
      default:
        return null; // You can return a default image or handle it as per your requirement
    }
  };

  return (
    <div style={{ display: 'flex' }}>
    <AdminNav />
     <div className="container mt-4 get-course">
      <h2>Course Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {courseData.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                {getSpeakerPhoto(course.speaker) && (
                    <img src={getSpeakerPhoto(course.speaker)} alt={`Photo of ${course.speaker}`} className="speaker-photo" />
                  )}
                  <h2 className="card-title">{course.title}</h2>
                  <p className="card-text"><strong>Description:</strong> {course.description}</p>
                  <p className="card-text"><strong>StartDate:</strong> {course.startDate}</p>
                  <p className="card-text"><strong>Speaker:</strong> {course.speaker}</p>
                  <button className="btn btn-primary" onClick={() => handleDetailsClick(course.id)}>View More Details</button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default GetCourse;
