import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import FaxSharpIcon from '@mui/icons-material/FaxSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import MicrowaveSharpIcon from '@mui/icons-material/MicrowaveSharp';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


export default function PagingTabs() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
const logoutHandle=()=>{
  localStorage.clear()
  window.location.href='/'
}

  return (
    <Box sx={{
        width: '100%',
        height: '100px'}}>
    <Stack spacing={2} direction="row" sx={{float:"right"}}>
    <Link className=" link" to='/'>   <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={logoutHandle}
        startIcon={<LoginSharpIcon />}
      >
        Logout
      </Button></Link>
     <Link className='link' to='/adminpage'> <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<AdminPanelSettingsSharpIcon />}
      >
        Admin
      </Button></Link>
      <Link className='link' to='/fax'>   <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<FaxSharpIcon />}
      >
       Fax List
      </Button>     </Link>
      <Link className='link' to='/rxlist'>    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<ListAltSharpIcon />}
      >
        RxTracker List
      </Button> </Link>
      <Link className='link' to='/casedetail'>  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<MicrowaveSharpIcon />}
      >
        Case Details
      </Button></Link>
      
    </Stack>
    </Box>
  );
}
