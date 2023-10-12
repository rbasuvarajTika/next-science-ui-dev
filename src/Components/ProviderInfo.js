import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  TableContainer,
  Table,
  Button,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  const [editingRowId, setEditingRowId] = useState(null);
  const [newRow, setNewRow] = useState({
    hcp_first_Name: '',
    hcp_last_Name: '',
    npi: '',
  });
  const { trnRxId } = useParams();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`/api/v1/fax/hcpInfo/${trnRxId}`, config);
        setApiData(response.data.data);
       // console.log("Provider",response.data.data);
        setLoading(false);
       // console.log(response.data.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (rowId) => {
    setEditingRowId(rowId);
  };

 
  const handleInputChange = (rowId, event, field) => {
    // Handle input changes for editing an existing row
    const updatedData = apiData.map((row) => {
      if (row.id === rowId) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setApiData(updatedData);
  };
  const handleSaveClick = (rowId) => {
    // Handle saving changes for an existing row
    setEditingRowId(null);
    // Send an API request to save the changes on the server if needed
  };
  const handleAddRowClick = () => {
    // Create a new row with empty fields
    const newId = apiData.length + 1;
    const newRowWithId = { id: newId, ...newRow };
    setApiData([...apiData, newRowWithId]);
  };
  const handleCancelClick = (rowId) => {
    // Handle canceling changes for an existing row
    if (rowId === apiData.length + 1) {
      // Remove the newly added row when canceling
      const updatedData = apiData.filter((row) => row.id !== rowId);
      setApiData(updatedData);
    }
    setEditingRowId(null);
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

        const response = await axios.get(`/api/v1/fax/officeInfo/${trnRxId}`, config);
        console.log("API Response", response.data.data);
        
        // Assuming the data array contains the information you need
        const officeDataArray = response.data.data;
        console.log("officeDataArraynew", officeDataArray.accountName);
        setOfficeData(officeDataArray)
        // Assuming you want to use the first item in the array
        const firstOfficeData = officeDataArray[0];
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

  const handleDeleteButtonClick = (rowId) => {
    setRowToDelete(rowId);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = () => {
    setDeleteConfirmationOpen(false);
    const updatedData = apiData.filter((row) => row.id !== rowToDelete);
    setApiData(updatedData);
    setRowToDelete(null);
  };
  return (
    <>
     <Button
        style={{ float: 'right', marginTop: '1rem', marginRight: '1rem' }}
        variant="contained"
        color="primary"
        onClick={handleAddRowClick}
      >
        Add 
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Signed</TableCell>
              <TableCell>Provider Name</TableCell>
              <TableCell>NPI</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name="firstName"
                          label="First Name"
                          value={row.hcp_first_Name}
                          onChange={(e) => handleInputChange(row.id, e, 'hcp_first_Name')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name="lastName"
                          label="Last Name"
                          value={row.hcp_last_Name}
                          onChange={(e) => handleInputChange(row.id, e, 'hcp_last_Name')}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    `${row.hcp_first_Name} ${row.hcp_last_Name}`
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <TextField
                      fullWidth
                      name="npi"
                      label="NPI"
                      value={row.npi}
                      onChange={(e) => handleInputChange(row.id, e, 'npi')}
                    />
                  ) : (
                    row.npi
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <>
                      <Button onClick={() => handleSaveClick(row.id)} variant="outlined">
                        Save
                      </Button>
                      <Button onClick={() => handleDeleteButtonClick(row.id)} variant="outlined" color="secondary">
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditClick(row.id)} variant="outlined">
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteButtonClick(row.id)} variant="outlined" color="secondary">
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Row</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {officeData && (
        <form   style={{ marginTop: '1rem',  }}>
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
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                    
                  ))}
                  <MenuItem key={officeData.state} value={officeData.state}>
                      {officeData.state}
                    </MenuItem>
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