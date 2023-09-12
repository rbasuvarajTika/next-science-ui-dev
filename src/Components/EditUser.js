import * as React from 'react';
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
import axios from 'axios';

export default function EditUser() {
  const [alignment, setAlignment] = React.useState('web');
  const [userData, setUserData] = React.useState({
    userName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    password:''
  });

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem('token');

      //Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,

        },
        
      };
     // const url = `http://localhost:3000/posts/${userData.userId}`;
      const response = await axios.put(`/api/v1/users/update/user/${userData.userName}`, userData,config);

      if (response.status === 201) {
        // User was successfully created (assuming you return a 201 status code)
        // You can handle success here, e.g., show a success message
      } else {
        // Handle errors, e.g., show an error message
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
          <Button
            variant="contained"
            sx={{ backgroundColor: '#9e9e9e', color: 'black' }}
          >
            Edit User - Admin Page
          </Button>
          <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
            <div>
              <p className="fieldLabel">User ID</p>
              <TextField
                margin="normal"
                name="userName"
                type="text"
                label="User ID"
                value={userData.userName}
                onChange={handleInputChange}
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
              />
            </div>

            <div>
              <p>Enter New Password:</p>
            </div>
            <div>
              <TextField
                margin="normal"
                name="password"
                type="password"
                label="New Password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
          </Stack>
        </Box>
        <Divider light />
        <Stack spacing={4} direction="row" sx={{ marginTop: '20px' }}>
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
        </Stack>
        <Button
          type="button"
          variant="outlined"
          className="border"
          sx={{ mt: 3, mb: 2, backgroundColor: 'blue', color: 'black' }}
          onClick={updateUser}
        >
          Submit
        </Button>
      </Container>
    </React.Fragment>
  );
}
