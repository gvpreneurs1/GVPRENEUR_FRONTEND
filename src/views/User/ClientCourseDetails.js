import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const ClientCourseDetails = () => {
  const [courseData, setCourseData] = useState({});
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/get-course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.status === 201) {
          const { course } = response.data;
          setCourseData(course);
        } else {
          console.error('respon data is not supporting us:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);


  return (
    <div className="container mt-4">    
      <h2>Course Details</h2>
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
           <ul className="list-group">
            <h1>This is selected</h1>
            <li className="list-group-item">
              <strong>Title:</strong> {courseData.title}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {courseData.description}
            </li>
            <li className="list-group-item">
              <strong>Link:</strong> {courseData.link}
            </li>
            <li className="list-group-item">
              <strong>Start Date:</strong> {courseData.startDate}
            </li>
            <li className="list-group-item">
              <strong>End Date:</strong> {courseData.endDate}
            </li>
            <li className="list-group-item">
              <strong>Speaker:</strong> {courseData.speaker}
            </li>
            <li className="list-group-item">
              <strong>Host:</strong> {courseData.host}
            </li>
            <li className="list-group-item">
              <strong>Attendees:</strong> {courseData.attendees}
            </li>
          </ul>
        </div>
        
      )}

    </div>
  );
};

export default ClientCourseDetails;