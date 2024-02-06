import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ClientCourseDetails = () => {
  const [courseData, setCourseData] = useState({});
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
                  <input type="text" name="speaker" value={formData.speaker || ''} onChange={handleInputChange} />
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
        </div>
        
      )}

    </div>
  );
};

export default ClientCourseDetails;