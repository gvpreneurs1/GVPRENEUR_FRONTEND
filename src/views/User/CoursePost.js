import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursePost = () => {
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const handleClientCourseClick = (id) => {
    navigate(`/get-client-course`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve courseId and userId from localStorage
        const courseId = localStorage.getItem('courseId');
        const userId = localStorage.getItem('userId');

        if (!courseId || !userId) {
          console.error('CourseId or UserId not found in localStorage');
          return;
        }

        // Make a POST request directly
        const postResponse = await axios.post(`http://localhost:3005/api/add-user-course/${userId}/${courseId}`);

        // Handle the POST response as needed
        console.log(postResponse.data);

        // Update the state to indicate success
        setIsSuccess(true);
      } catch (error) {
        console.error('Error:', error);

        // Update the state to indicate failure
        setIsSuccess(false);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {isSuccess === true && <p>User has been added to the course successfully.</p>}
      {isSuccess === false && <p>Something went wrong while adding the user to the course.</p>}
      <button class="bg-green hover:bg-green-500 text-black-700 font-semibold hover:text-black py-2 px-4 border border-black-900 hover:border-transparent rounded"
       onClick={handleClientCourseClick}>Get Back</button>
    </div>
  );
};

export default CoursePost;