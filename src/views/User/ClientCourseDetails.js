import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ClientNav from './ClientNav';
import { ToastContainer, toast } from 'react-toastify';
import { Mail, MessageCircle, Link, Calendar, User, Users } from 'react-feather';
import useEsewa from "./useEsewa"
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer/Footer';
import './ClientCourseDetails.css'
import Modal from 'react-modal';
Modal.setAppElement('#root');


const ClientCourseDetails = () => {
  const [courseData, setCourseData] = useState({ attendees: [] });
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
  const userId = localStorage.getItem('userId');

  const [modalIsOpen, setModalIsOpen] = useState(false);


    const [openEsewaPortal] = useEsewa()
  
    const proceedToBuy = () => {
      localStorage.setItem('userId',userId);
      localStorage.setItem('courseId',id);
      const payload = {
          "amount": "1000",
          "product_delivery_charge": "0",
          "product_service_charge": "0",
          "product_code": "EPAYTEST",
          "signed_field_names": "total_amount,transaction_uuid,product_code",
          "success_url": `http://localhost:3005/api/esewa-success/${userId}/${id}`,
          "failure_url": "http://google.com",
          "tax_amount": "0",
          "total_amount": "1000",
        }
  
        openEsewaPortal(payload)
    }
  

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
            {loading && <p>Loading...</p>}
 
          <button
            type="button"
            onClick={proceedToBuy}
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Buy with esewa
          </button>
       
 
            </li>
            <li>
            {courseData &&
        userId &&
        courseData.attendees.some(attendee => attendee.id === userId) && (
            <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={handleOpenModal}>
              Open Attendees Modal
            </button>
             )}
            </li>
          </ul>
        </div>
        
      )}
      <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
       onClick={handleBack}>Go Back</button>

      <ToastContainer />
    
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Attendees Modal"
      >
        <h2>Attendees List</h2>
        <h2>Link: {courseData.link}</h2>
        <div className='client-table'>
        <table>
          <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
          </thead>
          <tbody>
            {courseData.attendees.map((attendee, index) => (
              <tr key={index}>
                <td>{attendee.username}</td>
                <td>{attendee.email}</td>
                <td>{attendee.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <button onClick={handleCloseModal} 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
           Close</button>
      </Modal>
    <Footer />
    </section>
  );
};

export default ClientCourseDetails;