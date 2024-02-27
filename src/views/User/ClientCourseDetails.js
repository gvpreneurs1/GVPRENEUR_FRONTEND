import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ClientNav from './ClientNav';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, MessageCircle, Link, Calendar, User, Users } from 'react-feather';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer/Footer';
import Modal from 'react-modal';
Modal.setAppElement('#root');


const ClientCourseDetails = () => {
  const [courseData, setCourseData] = useState({ attendees: [] });
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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

  const handleEnroll = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const response = await axios.post(`http://localhost:3005/api/add-user-course/${userId}/${id}`);

      if (response.status === 201) {
        toast.success('User enrolled successfully', { position: 'top-center' });
        // Optionally update the UI or show a success message
        console.log('User enrolled successfully');
      } else {
        console.error('Failed to enroll user:', response.statusText);
      }
    } catch (error) {
      if (error.response.status === 409) {
        // Show toast error when the user is already enrolled
        toast.error('User is already enrolled in this course',);
      } else {
        console.error('Error enrolling user:', error);
      }
    }
  };

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
           <table>
                    <tr>
                      <td>   
                        <div className="flex-container">
                          <Mail /> <b>Title:</b>
                        </div></td>
                      <td>{courseData.title}</td>
                    </tr>
                    <tr>
                      <td><div className="flex-container">  
                        <MessageCircle />
                        <b> Description:</b>
                        </div></td>
                           
                      <td>{courseData.description}</td>
                    </tr>
                    <tr>
                      <td><div className="flex-container">
                        <Link />  <b> Link: </b>
                       </div></td>
                      <td><a>{courseData.link}</a></td>
                    </tr>
                    <tr>
                      <td> <div className="flex-container">
                        <Calendar /> <b> Start Date:</b>
                        </div></td>
                      <td>{new Date(courseData.startDate).toISOString().split("T")[0]}</td>
                    </tr>
                    <tr>
                      <td> <div className="flex-container">
                        <Calendar /> <b>  End Date:</b>
                       </div></td>
                      <td>{new Date(courseData.endDate).toISOString().split("T")[0]}</td>
                    </tr>
                    <tr>
                      <td> <div className="flex-container">
                       <Users />  <b> Speaker:  </b>
                     </div></td>
                      <td>{courseData.speaker}</td>
                    </tr>
                    <tr>
                      <td>  <div className="flex-container">
                       <User /> <b>Host: </b>
                       </div></td>
                      <td>{courseData.host}</td>
                    </tr>
                  </table>
            <li>
            <button className="button mt-2" onClick={handleEnroll}>
          Enroll
        </button>
            </li>
            <li>
            <button className="button mt-2" onClick={handleOpenModal}>
              Open Attendees Modal
            </button>
            </li>
          </ul>
        </div>
        
      )}
      <button className='button' onClick={handleBack}>Go Back</button>

      <ToastContainer />
    
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Attendees Modal"
      >
        <h2>Attendees List</h2>
        <ul>
          {courseData.attendees.map((attendee, index) => (
            <li key={index}>{attendee}</li>
          ))}
        </ul>
        <button onClick={handleCloseModal} 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
           Close</button>
      </Modal>
    <Footer />
    </section>
  );
};

export default ClientCourseDetails;