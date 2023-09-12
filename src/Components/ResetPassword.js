import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ResetPassword({ onReset }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the newPassword and confirmPassword match
    if (newPassword === confirmPassword) {
      // Update the password in the database
      // You can implement this logic as needed

      onReset(); // Call the onReset callback to complete the password reset
    } else {
      // Handle password mismatch error
    }
  };

  return (
    <div className="reset-password-container">
      <Paper elevation={3} className="reset-password-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
}
