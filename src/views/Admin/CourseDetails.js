import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
 
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/get-course/${id}`);
        
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
  }, [id]);

  return (
    <div>
      <h2>Course Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          
                <h1>this is selected</h1>
              <strong>Title:</strong> {courseData.title}<br />
              <strong>Description:</strong> {courseData.description}<br />
              <strong>Link:</strong> {courseData.link}<br />
              <strong>Start Date:</strong> {courseData.startDate}<br />
              <strong>End Date:</strong> {courseData.endDate}<br />
              <strong>Speaker:</strong> {courseData.speaker}<br />
              <strong>Host:</strong> {courseData.host}<br />
              <strong>Attendees:</strong> {courseData.attendees}<br />
              <hr />
         
        </ul>
      )}
    </div>
  );
};

export default CourseDetails;
