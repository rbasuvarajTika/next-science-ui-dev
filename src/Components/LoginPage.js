import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const defaultTheme = createTheme();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const axiosLogin = async () => {
    try {
     //const response = await axios.post('https://dev.tika.mobi:8443/next-service/api/v1/auth/signin', {
       const response = await axios.post('/api/v1/auth/signin', {
        userName: email,
        password: password,
      });

      if (response.data && response.data.token) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        return role; // Return the role (User or Admin)
      } else {
        return 'LoginFailed'; // Login failed
      }
    } catch (error) {
      console.error('Login error:', error);
      return 'LoginFailed'; // Login failed
    }
  };

 
  const handleLogin = async (event) => {
    event.preventDefault();

    // Call the custom Axios login function
    const loginRole = await axiosLogin();

    if (loginRole === 'Admin') {
      navigate("/nsrxmgt/adminpage");
      
    } else if (loginRole === 'User') {
      navigate("/nsrxmgt/fax");
     
    } else {

      alert('Login failed. Incorrect Email or Password.');
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            border: '1px solid black',
            borderRadius: '10px',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <div style={{ width: '100%' }}>
              {/* Dropdown for selecting role */}
         
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ width: '30%', float: 'left', lineHeight: '85px' }}>
                <label>User ID</label>
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="outlined-size-small"
                name="email"
                autoComplete="off"
                autoFocus
                sx={{ width: '70%', float: 'right', borderRadius: '10px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ width: '100%', clear: 'both' }}>
              <div style={{ width: '30%', float: 'left', lineHeight: '85px' }}>
                <label>Password</label>
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="outlined-size-small"
                autoComplete="off"
                sx={{ width: '70%', float: 'right', borderRadius: '10px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Grid container>
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Link href="#" to="/confirmemail" color="primary">
                  Forgot UserId/Password
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="outlined"
              className="border"
              sx={{ mt: 3, mb: 2, float: 'right' }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
