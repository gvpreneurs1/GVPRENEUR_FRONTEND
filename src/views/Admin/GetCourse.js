import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/get-course/');
        
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
  return (
    <div>
      <h2>Course Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {courseData.map((course) => (
            <li key={course.id}>
              <strong>ID:</strong> {course.id}<br />
              <strong>Title:</strong> {course.title}<br />
              <strong>Description:</strong> {course.description}<br />
              <strong>Link:</strong> {course.link}<br />
              <strong>Start Date:</strong> {course.startDate}<br />
              <strong>End Date:</strong> {course.endDate}<br />
              <strong>Speaker:</strong> {course.speaker}<br />
              <strong>Host:</strong> {course.host}<br />
              <strong>Attendees:</strong> {course.attendees}<br />
              <button onClick={() => handleDetailsClick(course.id)}>View CourseDetails</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetCourse;
