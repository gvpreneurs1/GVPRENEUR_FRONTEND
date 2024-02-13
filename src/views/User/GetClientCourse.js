import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientNav from './ClientNav';

const GetClientCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Tankaman1 = `${process.env.PUBLIC_URL}/images/Tankaman1.png`;
  const Apsara = `${process.env.PUBLIC_URL}/images/Apsara.jpg`;
  const Kiran = `${process.env.PUBLIC_URL}/images/Kiran.png`;
  const Purna = `${process.env.PUBLIC_URL}/images/Purna.png`;
  const Suman = `${process.env.PUBLIC_URL}/images/Suman.png`;
  const Saurav = `${process.env.PUBLIC_URL}/images/Saurav.jpg`;
  const placeholder = `${process.env.PUBLIC_URL}/images/placeholder.png`;

  const getSpeakerPhoto = (speaker) => {
    switch( speaker) {
        case 'Purna Bahadur Bista':
          return Purna;
        case 'Kiran tamang':
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
          return placeholder;
    }
  }

  
  const userId = localStorage.getItem('userId');

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
    navigate(`/client-course/${id}`);
  };
  return (
    <section> 
     <ClientNav />
     <div className="container mt-4">
  
      <h2>Course Details `{userId}`</h2>
        <h1> List of Meetings </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {courseData.reverse().map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                {getSpeakerPhoto(course.speaker) && (
                    <img src={getSpeakerPhoto(course.speaker)} alt={`Photo of ${course.speaker}`} className="speaker-photo" />
                  )}
                  <h5 className="card-title">{course.title}</h5>
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
    </section>
  );
};

export default GetClientCourse;
