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
import toast from 'react-hot-toast';

export default function CreateNewUser() {
  const [alignment, setAlignment] = React.useState('web');
  const [userData, setUserData] = React.useState({
    userName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    password: '', 
    type:'Standard',
    role:'DM',
  });


  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const createUser = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const response = await axios.post('/api/v1/users/create/user', userData, config);

      if (response.status === 201 || response.status === 200) {
        alert('User Created Successfully');
        window.location.href = '/AdminPage';
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

    // Use the spread operator to create a copy of the current userData
    const updatedUserData = { ...userData };
     console.log(updatedUserData);
    // Set the value for the changed field
    updatedUserData[name] = value;

    // Set default values of null for fields that are not in the form
    const fieldsNotInForm = [
      'middleName','confirmPassword','otherPassword','passwordUpdatedDate',
      'city','state','zip','image','salesForce','createdUser','createdDate','updatedUser','updateDate'
    ];

    for (const field of fieldsNotInForm) {
      if (!updatedUserData.hasOwnProperty(field)) {
        updatedUserData[field] = null;
      }
    }

    // Update the state with the modified userData
    setUserData(updatedUserData);
    console.log(updatedUserData);
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
          size='small'
          aria-label="Platform"
          sx={{ float: "left", borderRadius: '10px' }}
        >
          <ToggleButton value="Standard">Standard</ToggleButton>
          <ToggleButton value="SAML">SAML</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{}}>
          <Button variant="contained" sx={{ backgroundColor: "#8bc34a", color: "black" }}>Create New User</Button>
          <p style={{ textAlign: 'left' }}>Primary Email</p>
          <Stack spacing={4} direction="row">
            <div>
              <p className='fieldLabel'>*User Id</p>
              <TextField
                margin="normal"
                name="userName"
                value={userData.userName}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>

            <div>
              <p className='fieldLabel'>*First Name</p>
              <TextField
                margin="normal"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
              <p className='fieldLabel'>*Last Name</p>
              <TextField
                margin="normal"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
              <p className='fieldLabel'>Phone</p>
              <TextField
                margin="normal"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>
          </Stack>
          <Stack spacing={4} direction="row">
            <div>
              <p className='fieldLabel'>Secondary Email:</p>
              <TextField
                margin="normal"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>

            <div>
              <p className='fieldLabel'>Address:</p>
              <TextField
                margin="normal"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                type="text"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
            </div>
            <div>
            <p className='fieldLabel'>Password:</p>
              <TextField
                margin="normal"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                type="password"
                id="outlined-size-small"
                size='small'
                sx={{ marginTop: 0 }}
              />
             

        </div>
        </Stack>
        </Box>
        <Divider light />

            <Button
              type="submit"
              variant="outlined"
              className='border'
              onClick={createUser}
              sx={{ mt: 3, mb: 2 , backgroundColor:'#ba000d',color:'black'}}
            >
              Submit
            </Button>
      </Container>
    </React.Fragment>
  );
}