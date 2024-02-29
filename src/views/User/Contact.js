import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from 'axios';
import ClientNav from './ClientNav';
import Footer from '../../components/Footer/Footer';
import './Contact.css';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/api/save-message', {
        name,
        email,
        message,
      });

      if (response.status === 201) {
        console.log('Message saved successfully');
        // Optionally reset form fields or show a success message
      } else {
        console.error('Failed to save message:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return (
    <section>
    <ClientNav />
    <div className="Contact-Page ">
      <div className="Contact-Form "> 
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 600,
              mx: "auto",
              p: 2,
              border: "2px solid  #000000",
              borderRadius: "12px",
              boxShadow: 1,
            }}
          >
            <Typography variant="h4" align="center" mb={2}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                fullWidth
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#111",
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.688787263407!2d85.27784327515629!3d27.696012076189007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1901c1264855%3A0xb93db1ec2e63d3ee!2sGlobal%20Victors!5e0!3m2!1sen!2snp!4v1709193601560!5m2!1sen!2snp"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    </div>
        <Footer />
    </section>
  );
}

export default ContactForm;
