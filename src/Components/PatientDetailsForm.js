import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useParams } from 'react-router-dom';

import { usePatientData } from './PatientDataContext';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Grid,
    Radio,
    Table,
    TableBody,
    Button,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
import { ReadyForReview } from './ReadyForReview';
import WoundInfoTable from './WoundInfoTable';
  const data = [
    { id: 1, name: 'Provider 1', npi: '1234567890' },
    { id: 2, name: 'Provider 2', npi: '9876543210' },
    { id: 3, name: 'Provider 3', npi: '4567890123' },
    { id: 4, name: 'Provider 4', npi: '7890123456' },
  ];

function PatientDetailsForm() {
  const [patientName, setPatientName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [shipToAddress, setShipToAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize dateOfBirth as null
  const [salesRepName, setSalesRepName] = useState('');
  const [salesRepCell, setSalesRepCell] = useState('');
  const [yesNoValue, setYesNoValue] = useState('');
  const [placeOfService, setPlaceOfService] = useState(''); // Define placeOfService state
  const [orderInformation, setOrderInformation] = useState(''); // Define orderInformation state
  const [activeWound, setActiveWound] = useState(''); 
  
  const [patientData, setPatientData] = useState(null);
  const [isReadyForReview, setIsReadyForReview] = useState(false); // Track button click
  
  const { setPatient } = usePatientData();

  const { trnRxId } = useParams();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Make a GET request to the API using the trnRxId parameter
        const response = await axios.get(`/api/v1/fax/rxTrackerDetailList/${trnRxId}`, config);
        
        const responseData = response.data;
        console.log('isReadyForReview:', isReadyForReview);
        console.log('patientNamebefore:', patientName);

        if (responseData && responseData.data && responseData.data.length > 0) {
          const patientData = responseData.data[0]
          console.log('Fetched patient data:', patientData);;
          setPatientName(patientData.patientName);
          console.log("new",patientName);
          console.log(patientData.patientName);
          setCellPhone(patientData.cellPhone);
          setShipToAddress(patientData.shipToAddress);
          setCity(patientData.patientCity);
          setState(patientData.patientState);
           setZip(patientData.patientZip);
         setDateOfBirth(patientData.dateOfBirth); 
        // console.log(moment(patientData.dateOfBirth));// Parse dateOfBirth as a Moment.js object
          setSalesRepName(patientData.salesRepName);
          setSalesRepCell(patientData.salesRepCell);
            setYesNoValue(patientData.yesNoValue);
            setPatient(patientData);
            
            console.log("patientNamebeforeAfter:", patientData.patientName);
            console.log("Before rendering ReadyForReview:", patientData);
        } else {
          // Handle the case where no data is returned or the structure is different
          console.error('No patient data found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [trnRxId]);
 
  // useEffect(() => {
  //   // Convert the dateOfBirth value to a Moment.js object
  //   const dateOfBirthMoment = moment(dateOfBirth);
  //   const currentDateMoment = moment();

  //   // Check if dateOfBirth is before the current date
  //   const isDateOfBirthBeforeCurrentDate = dateOfBirthMoment.isBefore(currentDateMoment);

  //   // You can use isDateOfBirthBeforeCurrentDate in your logic
  //   if (isDateOfBirthBeforeCurrentDate) {
  //     // Do something when dateOfBirth is before the current date
  //     console.log('Date of Birth is before the current date.');
  //   } else {
  //     // Do something else when dateOfBirth is not before the current date
  //     console.log('Date of Birth is after or equal to the current date.');
  //   }
  // }, [dateOfBirth]);
  //  const handleYesNoChange = (event) => {
  //    setYesNoValue(event.target.value);
  // };
  
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
              label={"PatientName"}
              fullWidth
              id="patientName"
                    size="small"
              value={patientName}
              
              onChange={(e) => setPatientName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label={"Cell Phone"}
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
          <Grid item xs={12} sm={4}>
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
<Grid item xs={12} sm={4}>
  <TextField
    label="Date of Birth"
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
          <Grid item xs={12} sm={6}>
        <TextField
          label="Place of Service"
          fullWidth
          size="small"
          value={placeOfService}
          onChange={(e) => setPlaceOfService(e.target.value)}
        />
      </Grid>

      {/* Order Information */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Order Information"
          fullWidth
          size="small"
          value={orderInformation}
          onChange={(e) => setOrderInformation(e.target.value)}
        />
      </Grid>

      {/* Does Patient Still Have an Active Wound */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Does Patient Still Have an Active Wound"
          fullWidth
          size="small"
          value={activeWound}
          onChange={(e) => setActiveWound(e.target.value)}
        />
      </Grid>
    </Grid>
      </form>
    </Container>
     

    <WoundInfoTable/>
<TableContainer component={Paper} sx={{
          width: '100%',
          maxWidth: '60px',
          maxHeight:'360px',
          margin: '1rem',
          minWidth: '400px', // Minimum width added here
        }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Provider Name</TableCell>
          <TableCell>NPI</TableCell>
          <TableCell>Select</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {data.map((row) => (
    <TableRow key={row.id}>
      <TableCell>
        <Radio
          // You can handle radio button selection here
          // For example, using state to track selected rows
          // onChange={(e) => handleRadioChange(e, row.id)}
        />
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.npi}</TableCell>
    </TableRow>
  ))}
</TableBody>
    </Table>
  </TableContainer>
            <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                <Grid item>
                <Link className='link' to='/review'>
                <Button
              variant="outlined"
              style={{ right: '45rem', bottom: '1rem' }}
              onClick={() => {
                setIsReadyForReview(true);
                console.log('Ready for Review button clicked');
              }}
            >
              Ready for Review
            </Button></Link>
                </Grid>    
                {patientData && isReadyForReview && <ReadyForReview patientData={patientData} />}
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
