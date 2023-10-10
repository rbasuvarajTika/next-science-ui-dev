import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Checkbox ,
    Select,
    TextField,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Button,
    FormControlLabel,
  } from '@mui/material';
const initialState = {
  officeName: '',
  cellPhone: '',
  email: '',
  city: '',
  state: '',
  zip: '',
};

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

export default function ProviderInfo() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };
  const data = [
    { id: 1, name: 'Provider 1', npi: '1234567890' },
    { id: 2, name: 'Provider 2', npi: '9876543210' },
    { id: 3, name: 'Provider 3', npi: '4567890123' },
    { id: 4, name: 'Provider 4', npi: '7890123456' },
  ];

  return (
    <>   <TableContainer component={Paper} sx={{
        width: '100%',
        maxWidth: '60px',
        maxHeight:'360px',
        margin: '1rem',
        minWidth: '400px', // Minimum width added here
      }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Signed</TableCell>
        <TableCell>Provider Name</TableCell>
        <TableCell>NPI</TableCell>
         
      </TableRow>
    </TableHead>
    <TableBody>
{data.map((row) => (
  <TableRow key={row.id}>
    <TableCell>
      <Checkbox 
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Office Name"
            name="officeName"
            value={formData.officeName}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Cell Phone"
            name="cellPhone"
            value={formData.cellPhone}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
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
            value={formData.zip}
            onChange={handleChange}
            
          />
        </Grid>
      </Grid>
      
    </form>
    </>
  );
}


