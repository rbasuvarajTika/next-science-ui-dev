import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Table,
    TableBody,
    Button,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';

function PatientDetailsForm() {
  const [patientName, setPatientName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [shipToAddress, setShipToAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [salesRepName, setSalesRepName] = useState('');
  const [salesRepCell, setSalesRepCell] = useState('');
  const [yesNoValue, setYesNoValue] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleYesNoChange = (event) => {
    setYesNoValue(event.target.value);
  };
  const tableData = [
    {
      wound: 'Sample Wound',
      location: 'Sample Location',
      length: 'Sample Length',
      width: 'Sample Width',
      depth: 'Sample Depth',
      woundStage: 'Sample Wound Stage',
      drainage: 'Sample Drainage',
      icd10Code: 'Sample ICD-10 Code',
      debridementDate: 'Sample Date',
      debridementType: 'Sample Type',
    },
    // Add more data as needed
  ];


  return (
    <>
    <Container
      sx={{
        width: '50%',
        marginLeft: '1rem',
        margintop: '1rem',
        border: '1px solid #ccc', // Border color
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Shadow
        borderRadius: '8px', // Rounded corners
        padding: '1rem',
        
      }}
    >
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center', left: '1rem' }}>
        Patient Details
      </Typography>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Patient Name"
              fullWidth
              size="small"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Cell Phone"
              fullWidth
              size="small"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Ship To Address"
              fullWidth
              size="small"
              value={shipToAddress}
              onChange={(e) => setShipToAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="City"
              fullWidth
              size="small"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="State"
              fullWidth
              size="small"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="ZIP"
              fullWidth
              size="small"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Date of Birth "
              fullWidth
              size="small"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Sales Rep Name"
              fullWidth
              size="small"
              value={salesRepName}
              onChange={(e) => setSalesRepName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Sales Rep Cell"
              fullWidth
              size="small"
              value={salesRepCell}
              onChange={(e) => setSalesRepCell(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <RadioGroup
              aria-label="YesNo"
              name="yesNo"
              value={yesNoValue}
              onChange={handleYesNoChange}
              row
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
      </form>
    </Container>
    <Container
        sx={{
          marginLeft: '-1rem', // Make sure marginLeft is the same as the first container
        }}
      >
        <Typography variant="h6" gutterBottom style={{ textAlign: 'start' }}>
          Order Information
        </Typography>
        <Button
              type="submit"
              variant="outlined"
              className="border"
              style={{bottom:'2rem',
            left:'30rem'
            }}
              size='small'
            >
              Add
            </Button>
        <TableContainer component={Paper} style={{left:'1rem', 
    width:'50%'
    }}>
          <Table >
          <TableHead>
  <TableRow>
    <TableCell style={{ minWidth: 10 }}>Wound</TableCell>
    <TableCell style={{ minWidth: 10 }}>Location</TableCell>
    <TableCell style={{ minWidth: 10 }}>Length</TableCell>
    <TableCell style={{ minWidth: 10 }}>Width</TableCell>
    <TableCell style={{ minWidth: 10 }}>Depth</TableCell>
    <TableCell style={{ minWidth: 10 }}>Wound Stage</TableCell>
    <TableCell style={{ minWidth: 10 }}>Drainage</TableCell>
    <TableCell style={{ minWidth: 10 }}>Debrided ICD-10 Code</TableCell>
    <TableCell style={{ minWidth: 10 }}>Debridement Date</TableCell>
    <TableCell style={{ minWidth: 10 }}>Debridement Type</TableCell>
  </TableRow>
</TableHead>
           
          </Table>
        </TableContainer>
      </Container>
      <TableContainer component={Paper} style={{ left: '1rem', width: '50%' }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ minWidth: 10, paddingTop: '20px' }}>(WND)#</TableCell>
        <TableCell style={{ minWidth: 10, paddingTop: '20px' }}>Check Desired Kit</TableCell>
        <TableCell style={{ minWidth: 10, paddingTop: '20px' }}>Description</TableCell>
        <TableCell style={{ minWidth: 10, paddingTop: '20px' }}>A-Code</TableCell>
      </TableRow>
    </TableHead>
  </Table>
</TableContainer>

            <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                <Grid item>
                    <Button variant="outlined" 
                  style={{right:'45rem', bottom:'1rem'}}  >Ready for Review</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary"   style={{right:'30rem',bottom:'1rem'}}>
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary"   style={{right:'10rem',bottom:'1rem'}}>
                        
                        Discard
                    </Button>
                </Grid>
            </Grid>
    </>
  );
}

export default PatientDetailsForm;
