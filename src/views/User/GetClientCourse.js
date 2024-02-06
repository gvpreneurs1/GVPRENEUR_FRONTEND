import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetClientCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
     <div className="container mt-4">
      <h2>Course Details</h2>
        <h1> jiwan maa </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {courseData.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
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
  );
};

export default GetClientCourse;
