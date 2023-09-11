import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserTable from './UserTable';
import PagingTabs from './PagingTabs';


const top100Films = [
  { label: 'All Users', year: 1994 },
  { label: 'Active Users', year: 1972 },
  { label: 'Deactivated Users', year: 1974 },
]

export default function AdminPage() {
  const [searchUser, setSearchUser] = useState('');

  const handleChange = (e) => {
    setSearchUser(e.target.value)
  }

  console.log(searchUser)

  return (
    <>  
    <PagingTabs/>  
    <Box
    sx={{
      width: '90%',
    }}>
            <Button variant="contained">Admin Tasks</Button>
    </Box>

    <Stack direction="row" spacing={2}>
    <Box
    sx={{
      width: '20%',
      
    }}>
       <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="Users" />}
    />
     
    </Box>
    <Box
    sx={{
      width: '80%',
    }}>
     
      <Stack spacing={2} direction="row" sx={{float:"right"}}>
      <TextField
              margin="normal"
              name="Search User"
              label="Serach User"
              type="text"
              id="outlined-size-small"
              value={searchUser}
              onChange={handleChange}
            />
            <Button variant="contained" style={{backgroundColor :'#ff5722', color:"#000"}}>Create New User</Button>
            <Button variant="contained" style={{backgroundColor :'#ffc400', color:"#000"}}>Report Fields</Button>
      </Stack>

    </Box>
    </Stack>
    <UserTable searchUser={searchUser}/>
    </>

  );
}