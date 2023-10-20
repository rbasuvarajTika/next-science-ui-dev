import React, { useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PagingTabs from './PagingTabs';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosBaseURL from './axios.js';

export default function EditUser() {
  const { userId } = useParams(); // Get the user ID from route parameters
  const location = useLocation();
  const navigate  = useNavigate();
  const selectedUser = location.state?.user || null;
  const [alignment, setAlignment] = React.useState('web');
  const [userData, setUserData] = React.useState(selectedUser || {
    userName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let userDataToSet = selectedUser || { // Use selectedUser if available, otherwise initialize with empty values
          userName: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          address: '',
          password: '',
        };

        if (!selectedUser && userId) {
          // Fetch user data only when userId is available and selectedUser is not set
          const response = await axiosBaseURL.get(`/api/v1/users/user/${userId}`, config);
          if (response.status === 200) {
            alert('User Created Successfully');
            userDataToSet = response.data.data.data; // Assuming the response contains user data
           
          } else {
            // Handle errors
            alert('Failed to Update')
          }
        }

        setUserData(userDataToSet);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle network or other errors
      }
    };

    fetchUserData();
  }, [userId, selectedUser]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosBaseURL.put(
        `/api/v1/users/update/user/${userId}`,
        userData,
        config
      );

      if (response.status === 201 || response.status === 200) {
        // User was successfully updated
        // You can handle success here, e.g., show a success message
        alert('User Updated Successfully');
       
        navigate("/nsrxmgt/adminPage");
      } else {
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle network or other errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <PagingTabs />
      <Container>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          size="small"
          aria-label="Platform"
          sx={{ float: 'left', borderRadius: '10px' }}
        >
          <ToggleButton value="Standard">Standard</ToggleButton>
          <ToggleButton value="SAML">SAML</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{}}>
          <Button variant="contained" sx={{ backgroundColor: "#8bc34a", color: "black" }}>Edit User</Button>
          <p style={{ textAlign: 'left' }}>Primary Email</p>
          <Stack spacing={4} direction="row">
            <div>
              <p className="fieldLabel">User ID</p>
              <TextField
                margin="normal"
                name="username"
                type="text"
                label="User ID"
                value={userData.username}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>

            <div>
              <p className="fieldLabel">First Name</p>
              <TextField
                margin="normal"
                name="firstName"
                type="text"
                label="First Name"
                value={userData.firstName}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
              <p className="fieldLabel">Last Name</p>
              <TextField
                margin="normal"
                name="lastName"
                type="text"
                label="Last Name"
                value={userData.lastName}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
              <p className="fieldLabel">Phone</p>
              <TextField
                margin="normal"
                name="phone"
                type="text"
                label="Phone"
                value={userData.phone}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>
          </Stack>
          <Stack spacing={4} direction="row">
            <div>
              <p className="fieldLabel">Address</p>
              <TextField
                margin="normal"
                name="address"
                type="text"
                label="Address"
                value={userData.address}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
            <p>Enter New Password:</p>
              <TextField
                margin="normal"
                name="password"
                type="password"
                label="New Password"
                value={userData.password}
                onChange={handleInputChange}
                sx={{ marginTop: 0 }}
              />
            </div>
          </Stack>
        </Box>
        <Divider light />
        {/* <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
          <p>Current Status</p>
          <Button
            type="button"
            variant="outlined"
            className="border"
            sx={{ mt: 3, mb: 2, backgroundColor: '#8bc34a', color: 'black' }}
          >
            Active
          </Button>
          <Button
            type="button"
            variant="outlined"
            className="border"
            sx={{ mt: 3, mb: 2, backgroundColor: 'red', color: '#fff' }}
          >
            User Locked
          </Button>
        </Stack>
        <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
          <p>Change Status To:</p>
          <Button
            type="button"
            variant="outlined"
            className="border"
            sx={{ mt: 3, mb: 2, backgroundColor: '#bf360c', color: 'black' }}
          >
            Deactivated
          </Button>
          <Button
            type="button"
            variant="outlined"
            className="border"
            sx={{ mt: 3, mb: 2, backgroundColor: '#00b0ff', color: '#000' }}
          >
            Unlock User
          </Button>
        </Stack> */}
        <Button
          type="button"
          variant="outlined"
          className="border"
          sx={{ mt: 3, mb: 2, backgroundColor: '#ba000d', color: 'black' }}
          onClick={updateUser}
        >
          Submit
        </Button>
      </Container>
    </React.Fragment>
  );
}
