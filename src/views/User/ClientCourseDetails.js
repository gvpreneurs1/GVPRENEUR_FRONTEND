import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ClientNav from './ClientNav';

const ClientCourseDetails = () => {
  const [courseData, setCourseData] = useState({});
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const Tankaman1 = `${process.env.PUBLIC_URL}/images/Tankaman1.png`;
  const Apsara = `${process.env.PUBLIC_URL}/images/Apsara.jpg`;
  const Kiran = `${process.env.PUBLIC_URL}/images/Kiran.png`;
  const Purna = `${process.env.PUBLIC_URL}/images/Purna.png`;
  const Suman = `${process.env.PUBLIC_URL}/images/Suman.png`;
  const Saurav = `${process.env.PUBLIC_URL}/images/Saurav.jpg`;
  const placeholder = `${process.env.PUBLIC_URL}/images/placeholder.png`;

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
        return placeholder;
    }
  };

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

  const handleBack = () => {
    navigate(`/get-client-course`)
  }

  return (
    <section> 
     <ClientNav />
    <div className="container mt-4 mx-auto block justify-center">    
      <h2>Course Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (

        <div className="details-profile">
            {getSpeakerPhoto(courseData.speaker) && (
            <img src={getSpeakerPhoto(courseData.speaker)} alt={`Photo of ${courseData.speaker}`} className="speaker-photo" />
            )}

           <ul className="list-group">
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
      <button className='button' onClick={handleBack}>Go Back</button>
    </div>
    </section>
  );
};

export default ClientCourseDetails;