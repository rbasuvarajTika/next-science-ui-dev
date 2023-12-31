import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosBaseURL from './axios.js';

export default function ResetPassword({ onReset }) {
  const { userId } = useParams(); // Get the user ID from route parameters
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the newPassword and confirmPassword match
    if (newPassword === confirmPassword) {
      try {
        // Send a PUT request to update the password in the database
        const response = await axiosBaseURL.put(
          `/api/v1/users/update/user/password/${userId}`,
          { newPassword: newPassword }
        );

        if (response.status === 200) {
          // Password reset successful
          // You can handle success here, e.g., show a success message
          onReset(); // Call the onReset callback to complete the password reset
        } else {
          // Handle errors, e.g., show an error message
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error resetting password:', error);
      }
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
