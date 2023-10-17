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
  'Ca',
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
  'Ok',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'TN',
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
  const [editableOfficeData, setEditableOfficeData] = useState({ ...officeData });
  const [selectedState, setSelectedState] = useState();
const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [newRow, setNewRow] = useState({
    hcp_first_Name: '',
    hcp_last_Name: '',
    npi: '',
  });
  const { trnRxId } = useParams();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
       console.log("editableOfficeData",editableOfficeData.state);
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

  
        const officeDataArray = response.data.data;
       
        
        // Assuming you want to use the first item in the array
        const firstOfficeData = officeDataArray[0];
        console.log("firstOfficeData", firstOfficeData.trnFaxId);
        console.log("accountId", firstOfficeData.accountId);

        console.log("officeDataArraynew", officeDataArray.trnFaxId);
  
        // Update editableOfficeData without overwriting the entire object
        setEditableOfficeData({
          ...editableOfficeData,
          accountId:firstOfficeData.accountId || '',
          officeName: firstOfficeData.accountName || '',
          cellPhone: firstOfficeData.phone || '',
          email: firstOfficeData.email || '',
          city: firstOfficeData.city || '',
          state: firstOfficeData.state || '',
          zip: firstOfficeData.zip || '',
          //zip: firstOfficeData.trnFaxId || '',
        });
        console.log("editableOfficeData.accountId",editableOfficeData.accountId);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching office data:', error);
        setLoading(false);
      }
    };
    fetchOfficeInfo();
  }, []);
  
  const handleSaveButtonClick = () => {
    // Get the token from your authentication mechanism, e.g., localStorage
    const token = localStorage.getItem('token');
  
    // Define the request headers with the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    // Define the data to send to the server
    const requestData = {
      // Include any other fields you want to update in the API
      accountId: editableOfficeData.accountId,
      accountName: editableOfficeData.officeName,
      phone: editableOfficeData.cellPhone,
      email: editableOfficeData.email,
      city: editableOfficeData.city,
      state: editableOfficeData.state,
      zip: editableOfficeData.zip,
      faxId: editableOfficeData.faxId, // Add faxId if needed
    };
  
    // Send a PUT request to update the office data
    axios
      .put(`/api/v1/fax/officeInfo`, requestData, config)
      .then((response) => {
        // Handle the response from the API if needed
        console.log('Data saved successfully:', response.data);
  
        // Exit edit mode
        setIsEditing(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error saving data:', error);
      });
  };
  
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


  const handleOfficeNameChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      officeName: event.target.value,
    });
  };

  const handleCellPhoneChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      cellPhone: event.target.value,
    });
  };

  const handleOfficeEmailChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      email: event.target.value,
    });
  };

  const handleCityChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      city: event.target.value,
    });
  };

  const handleStateChange = (event) => {
    editableOfficeData.state = event.target.value;
    console.log("After Rendering",editableOfficeData.state);
    setSelectedState(event.target.value);
  };
  const handleZipChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      zip: event.target.value,
    });
  };
  console.log("editableOfficeDatawwww", editableOfficeData);
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
      {editableOfficeData && (
        <form style={{ marginTop: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Office Name"
                name="officeName"
                value={editableOfficeData.officeName}
                onChange={handleOfficeNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cell Phone"
                name="cellPhone"
                value={editableOfficeData.cellPhone}
                onChange={handleCellPhoneChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={editableOfficeData.email}
                onChange={handleOfficeEmailChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={editableOfficeData.city}
                onChange={handleCityChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <Select
  name="state"
  value={editableOfficeData.state}
  onChange={handleStateChange}
  onOpen={() => setDropdownOpen(true)}
  onClose={() => setDropdownOpen(false)}
  open={isDropdownOpen}
>
  {states.map((state) => (
    <MenuItem key={state} value={state}>
      {state}
    </MenuItem>
  ))}
</Select>
</Grid>
              
       
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP"
                name="zip"
                value={editableOfficeData.zip}
                onChange={handleZipChange}
              />
            </Grid>
            
          </Grid>
          <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
          Save
        </Button>
      
        </form>
        
      )}
    </>
  );
}