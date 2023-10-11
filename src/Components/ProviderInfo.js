import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  Select,
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  FormControlLabel,
} from '@mui/material';

// const initialState = {
//   officeName: '',
//   cellPhone: '',
//   email: '',
//   city: '',
//   state: '',
//   zip: '',
// };

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export default function ProviderInfo() {
  const [apiData, setApiData] = useState([]);
  const [officeData, setOfficeData] = useState({
    officeName: '',
    cellPhone: '',
    email: '',
    city: '',
    state: '',
    zip: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/api/v1/fax/hcpInfo', config);
        setApiData(response.data.data);
        console.log("Provider",response.data.data);
        setLoading(false);
        console.log(response.data.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficeData({
      ...officeData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchOfficeInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('/api/v1/fax/officeInfo', config);
        console.log("API Response", response.data);
        
        // Assuming the data array contains the information you need
        const officeDataArray = response.data.data;
        
        // Assuming you want to use the first item in the array
        const firstOfficeData = officeDataArray[1];
        console.log("firstOfficeData",firstOfficeData.accountName);
        setOfficeData({
          officeName: firstOfficeData.accountName || '',
          cellPhone: firstOfficeData.phone || '',
          email: firstOfficeData.email || '',
          city: firstOfficeData.city || '',
          state: firstOfficeData.state || '',
          zip: firstOfficeData.zip || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching office data:', error);
        setLoading(false);
      }
    };
    fetchOfficeInfo();
  }, []);

console.log("officeData", officeData );


  const handleRadioChange = (e, id) => {
    // Handle the radio button selection here
    // You can use this function to track selected rows
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          maxWidth: '60px',
          maxHeight: '360px',
          margin: '1rem',
          minWidth: '400px',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Signed</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>NPI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : (
              apiData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <FormControlLabel
                      control={<Checkbox />}
                      onChange={(e) => handleRadioChange(e, row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.hcp_first_Name} {row.hcp_last_Name}</TableCell>
                  <TableCell>{row.npi}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {officeData && (
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Office Name"
                name="officeName"
                value={officeData.officeName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cell Phone"
                name="cellPhone"
                value={officeData.cellPhone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={officeData.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={officeData.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select name="state" value={officeData.state}>
                  {states.map((state) => (
                    <MenuItem key={state} value={officeData.state}>
                      {officeData.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP"
                name="zip"
                value={officeData.zip}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}