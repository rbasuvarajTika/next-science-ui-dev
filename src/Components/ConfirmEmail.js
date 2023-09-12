import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ConfirmEmail({ onNext }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the email exists in the database
    // If the email exists, proceed to the next step
    // You can implement this logic as needed

    onNext(); // Call the onNext callback to move to the next step
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
            size="small" // Set the size to medium
            sx={{ width: '50%', marginBottom: '16px' }} // Adjust the styling
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large" // Set the size to medium
             sx={{ width: '20%', marginBottom: '16px' }}
          >
            Next
          </Button>
        </form>
      </Paper>
    </div>
  );
}
