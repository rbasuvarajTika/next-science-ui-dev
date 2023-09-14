import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ConfirmEmail({ onNext }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API with the email data
      await axios.post('/api/v1/notification/emails/forgotpassword', {
        email: email,
      });

      // If the request is successful, call the onNext callback to move to the next step
      onNext();
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error sending confirmation email:', error);
    }
  };

  return (
    <div className="confirm-email-container">
      <Paper elevation={3} className="confirm-email-form">
        <h2>Confirm Email</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            size="small"
            sx={{ width: '50%', marginBottom: '16px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ width: '20%', marginBottom: '16px' }}
          >
            Next
          </Button>
        </form>
      </Paper>
    </div>
  );
}
