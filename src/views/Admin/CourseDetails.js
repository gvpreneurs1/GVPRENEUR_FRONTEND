import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CourseDetails = () => {
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

      if (response.status === 200) {
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
    <div>
      <h2>Course Details</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            <h1>this is selected</h1>
            <strong>Title:</strong> {courseData.title}
            <br />
            <strong>Description:</strong> {courseData.description}
            <br />
            <strong>Link:</strong> {courseData.link}
            <br />
            <strong>Start Date:</strong> {courseData.startDate}
            <br />
            <strong>End Date:</strong> {courseData.endDate}
            <br />
            <strong>Speaker:</strong> {courseData.speaker}
            <br />
            <strong>Host:</strong> {courseData.host}
            <br />
            <strong>Attendees:</strong> {courseData.attendees}
            <br />
            <hr />
          </ul>

          <button onClick={handleDelete}> Delete</button>
          <button onClick={handleEdit}> Edit </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleModalClose}
            contentLabel="Edit Course Modal"
          >
            <h2>Edit Course</h2>
           <form>
                <label>
                  Title:
                  <input type="text" name="title" value={formData.title || ''} onChange={handleInputChange} />
                </label>
                <label>
                description:
                  <input type="text" name="description" value={formData.description || ''} onChange={handleInputChange} />
                </label>
                <label>
                link:
                  <input type="text" name="link" value={formData.link || ''} onChange={handleInputChange} />
                </label>
                <label>
                startDate:
                  <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleInputChange} />
                </label>
                <label> 
                endDate:
                  <input type="date" name="endDate" value={formData.endDate || ''} onChange={handleInputChange} />
                </label>
                <label>
                speaker:
                  <input type="text" name="speaker" value={formData.speaker || ''} onChange={handleInputChange} />
                </label>
                <label>
                host:
                 <input type="text" name="host" value={formData.host || ''} onChange={handleInputChange} />
      </label>
          <button type="button" onClick={handleEditSubmit}>Save Changes</button>
          <button type="button" onClick={handleModalClose}>Cancel</button>
          </form>
          </Modal>
        </div>
        
      )}

    </div>
  );
};

export default CourseDetails;
