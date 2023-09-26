import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserTable from './UserTable';
import PagingTabs from './PagingTabs';
import { Link } from 'react-router-dom';

const top100Films = [
  { label: 'All Users', year: 1994 },
  { label: 'Active Users', year: 1972 },
  { label: 'Deactivated Users', year: 1974 },
];

export default function AdminPage() {
  const [searchUser, setSearchUser] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Users');

  const handleChange = (e) => {
    setSearchUser(e.target.value);
  };

  console.log(searchUser);

  const handleStatusFilterChange = (event, newValue) => {
    setStatusFilter(newValue?.label || 'All Users');
  };

  return (
    <>
      <PagingTabs />
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',     // Center vertically
          margin: '1 auto',        // Center horizontally within the container
        }}
      >
        <Button variant="contained">Admin Tasks</Button>
      </Box>

      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            width: '20%',
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            onChange={handleStatusFilterChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} label="Users" />}
            size='small'
          />
        </Box>
        <Box
          sx={{
            width: '80%',
          }}
        >
          <Stack spacing={1} direction="row" sx={{ float: 'right' }}>
            <TextField
              margin="normal"
              name="Search User"
              label="Search User"
              type="text"
              id="outlined-basic"
              value={searchUser}
              onChange={handleChange}
              size='small'
            />
            <Link href="#" to="/createnewuser">
              <Button variant="contained" style={{ backgroundColor: '#ff5722', color: '#000' }}>
                Create New User
              </Button>
            </Link>
            <Link href="#">
              <Button variant="contained" style={{ backgroundColor: '#ffc400', color: '#000' }}>
                Report Fields
              </Button>
            </Link>
          </Stack>
        </Box>
      </Stack>
      <UserTable searchUser={searchUser} statusFilter={statusFilter} />
    </>
  );
}
