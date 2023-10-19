import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useParams } from 'react-router-dom';
import BasicDatePicker from './BasicDatePicker';
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
    Select, // Import Select component
  MenuItem,
  InputLabel
  } from '@mui/material';

import { ReadyForReview } from './ReadyForReview';
import WoundInfoTable from './WoundInfoTable';
import ProviderInfo from './ProviderInfo';
  const data = [
    { id: 1, name: 'Provider 1', npi: '1234567890' },
    { id: 2, name: 'Provider 2', npi: '9876543210' },
    { id: 3, name: 'Provider 3', npi: '4567890123' },
    { id: 4, name: 'Provider 4', npi: '7890123456' },
  ];
function PatientDetailsForm() {
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientMiddleName, setPatientMiddleName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');

  const [cellPhone, setCellPhone] = useState('');
  const [shipToAddress, setShipToAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize dateOfBirth as null
  const [salesRepName, setSalesRepName] = useState('');
  const [salesRepCell, setSalesRepCell] = useState('');
  const [yesNoValue, setYesNoValue] = useState('');
  const [placeOfService, setPlaceOfService] = useState(''); // Define placeOfService state
  const [distributor, setDistributor] = useState('');
  const [orderInformation, setOrderInformation] = useState(''); // Define orderInformation state
  const [woundActive, setActiveWound] = useState(''); 
  const [patientId, setPatientId] = useState(''); 
   const [trnFaxId, setTrnFaxId] = useState('');
   const [faxId, setFaxId] = useState('');
   const [selectedState, setSelectedState] = useState();
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [isDropdownOpenState, setDropdownOpenState] = useState(false);

   const [cellPhoneError, setCellPhoneError] = useState('');
   const [zipError, setZipError] = useState('');
   const [ssnError, setSsnError] = useState('');
   const [states, setStates] = useState([]);
   const [distributorData, setDistributorData] = useState([]);

   const [patientData, setPatientData] = useState({
    state: '', // Initialize patientData with an object containing 'state' property
  });  
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
        const response = await axios.get(`/api/v1/fax/rxpatient/${trnRxId}`, config);
        
        const responseData = response.data;
        console.log(responseData);
        console.log('isReadyForReview:', isReadyForReview);
       

        if (responseData && responseData.data && responseData.data.length > 0) {
          const patientData = responseData.data[0]
          console.log('Fetched patient data:', patientData);;
          setPatientFirstName(patientData.patientFirstName);
          setPatientMiddleName(patientData.patientMiddleName);
          setPatientLastName(patientData.patientLastName);
         // console.log("new",patientName);
         // console.log(patientData.patientName);
          setCellPhone(patientData.cellPhone);
          setShipToAddress(patientData.shipToAddress);
          setSsn(patientData.ssn)
          console.log("ssn", patientData.ssn);
          setCity(patientData.city);
          setPatientData({
            state: patientData.state,
            // Set other fields as well
          });
           setZip(patientData.zip);
         setDateOfBirth(patientData.dateOfBirth); 
          setSalesRepName(patientData.repName);
          setSalesRepCell(patientData.repPhoneNo);
          setPlaceOfService(patientData.placeOfService);
          setDistributor(patientData.distributorName);
          setOrderInformation(patientData.orderType);
          setActiveWound(patientData.woundActive)
          setPatientId(patientData.patientId);
          setTrnFaxId(patientData.trnFaxId);
          setFaxId(patientData.faxId);
          console.log("PAtient", patientData.trnFaxId);
            setYesNoValue(patientData.yesNoValue);
            setPatient(patientData);
            
            console.log("patientData.state:", patientData.state);
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

  useEffect(() => {
    // Define a function to fetch the state data from the API
    const fetchStateData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const response = await axios.get('/api/v1/fax/stateDetails', config);
        const stateData = response.data.data; // Assuming the API returns an array of states
        setStates(stateData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    };
  
    // Call the fetchStateData function when the component mounts
    fetchStateData();
  }, []);
  
  const handleSave = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
  
    // Send the data to your API for saving
    const dataToSave = {
     patientId: patientId,
     trnFaxId:trnFaxId,
     faxId:faxId,
     patientFirstName: patientFirstName,
      patientMiddleName:patientMiddleName,
      patientLastName:patientLastName,
      cellPhone: cellPhone,
      shipToAddress: shipToAddress,
      ssn: ssn,
      city:  city,
      state:patientData.state,
      zip: zip,
      dateOfBirth: dateOfBirth,
      repName: salesRepName,
      repPhoneNo:salesRepCell,
      placeOfService: placeOfService,
      distributorName: distributor,
      orderType: orderInformation,
      woundActive:woundActive,
    };
  
    try {
      // Send a PUT request to your API to save the data and include the authorization header
      const response = await fetch(`/api/v1/fax/rxpatient`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify(dataToSave),
      });
      if (response.ok) {
        // Data saved successfully
        alert('Data saved successfully.');
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    // Define a function to fetch distributor data from the API
    const fetchDistributorData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('/api/v1/fax/distributorDetails', config);
        const distributorData = response.data.data; // Adjust based on API response structure

        setDistributorData(distributorData);
      } catch (error) {
        console.error('Error fetching distributor data:', error);
      }
    };

    // Call the fetchDistributorData function when the component mounts
    fetchDistributorData();
  }, []);
  const handleStateChange = (event) => {
    setPatientData({ ...patientData, state: event.target.value });
  };
  const handleCellPhoneChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 10);

    // Update the state and error message
    setCellPhone(truncatedValue);

    if (truncatedValue.length !== 10) {
      setCellPhoneError('Please enter only 10 digits .');
    } else {
      setCellPhoneError('');
    }
  };
  const handleZipChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const truncatedValue = numericValue.slice(0, 5);

    // Update the state and error message
    setZip(truncatedValue);

    if (truncatedValue.length !== 5) {
      setZipError('Please enter only 5 digits .');
    } else {
      setZipError('');
    }
  };

  const handleSsnChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const truncatedValue = numericValue.slice(0, 4);

    // Update the state and error message
    setSsn(truncatedValue);

    if (truncatedValue.length !== 4) {
      setSsnError('Please enter a valid 4-digit SSN.');
    } else {
      setSsnError('');
    }
  };
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
      <h4>NetSuite Patient ID :</h4>
      <div style={{ textAlign: 'right', marginTop: '-48px' }}>

   <h4>Tike ID :</h4>
</div>
      <form>
       
        <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
         
         <TextField
           label={"First Name"}
           fullWidth
           id="patientFirstName"
                 size="small"
         value={patientFirstName}
           
           onChange={(e) => setPatientFirstName(e.target.value)}
         />
       </Grid>
       <Grid item xs={12} sm={4}>
         
         <TextField
           label="Middle Name"
           fullWidth
           id="patientMiddleName"
                 size="small"
        value={patientMiddleName}
           
           onChange={(e) => setPatientMiddleName(e.target.value)}
         />
       </Grid>
       <Grid item xs={12} sm={4}>
         
         <TextField
           label="Last Name"
           fullWidth
           id="patientName"
                 size="small"
        value={patientLastName}
           
           onChange={(e) => setPatientLastName(e.target.value)}
         />
       </Grid>
         
         
          <Grid item xs={12} sm={5}>
          <TextField
      label="Cell Phone"
      fullWidth
      size="small"
      value={cellPhone}
      onChange={handleCellPhoneChange}
      error={!!cellPhoneError}
      helperText={cellPhoneError}
      InputProps={{
        inputProps: {
          inputMode: 'numeric',
        },
      }}
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
              label="Last 4 of SSN"
              fullWidth
              size="small"
             value={ssn}
              onChange={handleSsnChange }
              error={!!ssnError}
              helperText={ssnError}
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
          <Grid item xs={12} sm={3}>
          <Select
  name="state"
  value={patientData.state}
  onChange={handleStateChange}
  onOpen={() => setDropdownOpen(true)}
  onClose={() => setDropdownOpen(false)}
  open={isDropdownOpen}
>
  {states.map((state) => (
    <MenuItem key={state.stateName} value={state.shortName}>
    {state.stateName}
    </MenuItem>
  ))}
</Select>

      
          </Grid>
<Grid item xs={12} sm={2}>
<TextField
      label="ZIP"
      fullWidth
      size="small"
      value={zip}
      onChange={handleZipChange}
      error={!!zipError}
      helperText={zipError}
      InputProps={{
        inputProps: {
          inputMode: 'numeric',
        },
      }}
    />
</Grid>
<Grid item xs={12} sm={4}>
  <TextField
   label="DOB mm/dd/yyyy"
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
      <InputLabel htmlFor="order-information">Place of Service </InputLabel>

        <Select
          fullWidth
          size="small"
          value={placeOfService}
          onChange={(e) => setPlaceOfService(e.target.value)}
        >
           <MenuItem value={placeOfService}>{placeOfService}</MenuItem>
           <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              </Select>
      </Grid>
         
      <Grid item xs={12} sm={6}>
      <InputLabel htmlFor="order-information">Distributor</InputLabel>
      <Select
        fullWidth
        size="small"
        value={distributor}
        onChange={(e) => setDistributor(e.target.value)}
        onOpen={() => setDropdownOpenState(true)}
        onClose={() => setDropdownOpenState(false)}
        open={isDropdownOpenState}
      >
        {distributorData.map((item) => (
          <MenuItem key={item.distributorId} value={item.distributorName}>
            {item.distributorName} {/* Adjust based on the structure of distributor data */}
          </MenuItem>
        ))}
      </Select>
    </Grid>

      {/* Order Information */}
      <Grid item xs={12} sm={6}>
      <InputLabel htmlFor="order-information">Order Information</InputLabel>
        <Select
          label="Order Information"
          fullWidth
          size="small"
          value={orderInformation}
          onChange={(e) => setOrderInformation(e.target.value)}
        >
          <MenuItem value={orderInformation}>{orderInformation}</MenuItem>
           <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              </Select>
      </Grid>

      {/* Does Patient Still Have an Active Wound */}
      <Grid item xs={12} sm={6}>
      <InputLabel htmlFor="activeWound">Does Patient Still Have an Active Wound</InputLabel>
            <Select
              label="Does Patient Still Have an Active Wound"
              fullWidth
              size="small"
              value={woundActive}
              onChange={(e) => setActiveWound(e.target.value)}
            >
              <MenuItem value={woundActive}>{woundActive}</MenuItem>
              {/* Define options for the Active Wound dropdown */}
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </Grid>
    </Grid>
    
      </form>
      <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
    </Container>
     
<div style={{maxWidth:"50%"}}> 
    <WoundInfoTable trnRxId ={trnRxId} trnFaxId ={trnFaxId}/>
    </div>
  <div style={{maxWidth:"50%"}}> 

  <ProviderInfo trnRxId={trnRxId} trnFaxId={trnFaxId}/>
</div>
            <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                <Grid item>
                <Link className='link' to='/nsrxmgt/review'>
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
