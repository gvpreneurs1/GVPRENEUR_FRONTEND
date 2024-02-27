import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './CoursDetails.css';
import AdminNav from './AdminNav';
import { Mail, MessageCircle, Link, Calendar, User, Users } from 'react-feather';

Modal.setAppElement('#root');

const CourseDetails = () => {
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3005/api/delete-course/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 201) {
        console.log('Course deleted successfully.');
        navigate(`/get-course`);
      } else {
        console.error('Failed to delete course:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEdit = () => {
    setformData({
      title: courseData.title || '',
      description: courseData.description || '',
      link: courseData.link || '',
      startDate: courseData.startDate || '',
      endDate: courseData.endDate || '',
      speaker: courseData.speaker || '',
      host: courseData.host || '',
    });

    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const editedCourse = {  
        title: formData.title,
        description: formData.description,
        link: formData.link,
        startDate: formData.startDate,
        endDate: formData.endDate,
        speaker: formData.speaker,
        host: formData.host,
      };
      const response = await axios.put(`http://localhost:3005/api/edit-course/${id}`, editedCourse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 201) {

        const updatedResponse = await axios.get(`http://localhost:3005/api/get-course/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
  
        if (updatedResponse.status === 201) {
          const { course } = updatedResponse.data;
          setCourseData(course);
        } else {
          console.error('Failed to fetch updated course details:', updatedResponse.statusText);
        }  
        console.log('Course edited successfully.');
        setModalIsOpen(false);
      } else {
        console.error('Failed to edit course:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const backButton = () => {
    navigate(`/get-course`)
  }
  return (
    <section id='CourseDetails'>

    <div className="container mt-4">    
      <h2>Course Details</h2>
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="details-profile">
           {getSpeakerPhoto(courseData.speaker) && (
            <img src={getSpeakerPhoto(courseData.speaker)} alt={`Photo of ${courseData.speaker}`} className="speaker-photo" />
            )}
                  
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
                      <td>{courseData.link}</td>
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
                    <tr>
                      <td><div className="flex-container">
                       <User /> <b> Attendees:</b>   
                       </div></td>
                      <td>{courseData.attendees}</td>
                    </tr>
                  </table>
    </div>
        
      )}
      
      <div className="mt-3">
          <button className="btn btn-danger mr-2 custom-delete" onClick={handleDelete}>Delete</button>
          <button className="btn btn-primary custom-edit" onClick={handleEdit}>Edit</button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}
            contentLabel="Edit Course Modal"
          >
          <div className="modal-content">
           <div className="modal-header">
             <h2 className="modal-title">Edit Course</h2>
           </div>
           <div className="modal-body">
             <form className="animated-form">
                  <label>
                       Title:
                  <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} />
                </label>
                <label>
                Description:
                  <input type="text" name="description" value={formData.description || ''} onChange={handleInputChange} />
                </label>
                <label>
                Link:
                  <input type="text" name="link" value={formData.link || ''} onChange={handleInputChange} />
                </label>
                <label>
                StartDate:
                  <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleInputChange} />
                </label>
                <label> 
                EndDate:
                  <input type="date" name="endDate" value={formData.endDate || ''} onChange={handleInputChange} />
                </label>
                <label>
                Speaker:
                <select name="speaker" value={courseData.speaker || '' } onChange={handleInputChange}>
                  <option value="Purna Bahadur Bista">Purna Bahadur Bista</option>
                  <option value="Kiran Tamang">Kiran Tamang</option>
                  <option value="Tankaman Shrestha">Tankaman Shrestha</option>
                  <option value="Apsara Shrestha">Apsara Shrestha</option>
                  <option value="Suman Shrestha">Suman Shrestha</option>
                  <option value="Saurav Raj Giri">Saurav Raj Giri</option>
                  </select>
                </label>
                <label>
                Host:
                 <input type="text" name="host" value={formData.host || ''} onChange={handleInputChange} />
                </label>
          <div className="animated-buttons">
          <button type="button" className="btn btn-primary animated-button" onClick={handleEditSubmit}>Save Changes</button>
          <button type="button" className="btn btn-secondary animated-button" onClick={handleModalClose}>Cancel</button>
                 </div>
             </form>
           </div>
           </div>
           </Modal>
          <button
            onClick={backButton}
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
          Get back
          </button>
</div>
    </section>
  );
};

export default CourseDetails;