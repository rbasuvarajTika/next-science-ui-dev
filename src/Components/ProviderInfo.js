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
  'CA',
  'Colorado',
  'Connecticut',
  'Delaware',
  'FL',
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
  'PA',
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
  const [editableOfficeData, setEditableOfficeData] = useState({ ...officeData });
  const [trnFaxId, setTrnFaxId] = useState([]);
    const [states, setStates] = useState([]);
    const [editingRowId, setEditingRowId] = useState(null);
const [editingColumn, setEditingColumn] = useState(null);
  const [newRows, setNewRows] = useState([]); // Array to store new rows

const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { trnRxId } = useParams();
 const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);
  const [npiValue, setNpiValue] = useState('');

  const [npiError, setNpiError] = useState('');
  
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
        const trnFaxId = response.data.data[0].trnFaxId;
        console.log("hcpInfotrnFaxId",trnFaxId );
        setTrnFaxId(trnFaxId);
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

  const handleEditRowClick = (index) => {
    setEditingRowId(index);
  };
 
  const handleSaveRowClick = (rowId) => {
    // Handle saving changes for an existing row
    setEditingRowId(null);
    // Send an API request to save the changes on the server if needed
  };
  const handleCancelRowClick = (rowId) => {
    // Handle canceling changes for an existing row
    setEditingRowId(null);
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
  
    // Handle input changes for new rows
    const updatedNewRows = newRows.map((newRow) => {
      if (newRow.id === rowId) {
        return { ...newRow, [field]: event.target.value };
      }
      return newRow;
    });
    setNewRows(updatedNewRows);
  };
  const handleSaveClick = (rowId) => {
    // Handle saving changes for an existing row
    setEditingRowId(null);
    // Send an API request to save the changes on the server if needed
  };
  // const handleAddRowClick = () => {
  //   // Create a new row with empty fields
  //   const newId = apiData.length + 1;
  //   const newRowWithId = { id: newId };
  //   setApiData([...apiData, newRowWithId]);
  // };
  // const handleCancelClick = (rowId) => {
  //   // Handle canceling changes for an existing row
  //   if (rowId === apiData.length + 1) {
  //     // Remove the newly added row when canceling
  //     const updatedData = apiData.filter((row) => row.id !== rowId);
  //     setApiData(updatedData);
  //   }
  //   setEditingRowId(null);
  // };
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
          address1: firstOfficeData.address1 || '',
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
      address1:editableOfficeData.address1,
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
        
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error saving data:', error);
      });
  };
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
  console.log("aftertrans" ,trnFaxId);
  const handleSaveNewRow = async (newRow) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };
  
      // Format the newRow to match the desired format
      const formattedRow = {
        trnFaxId: trnFaxId,
        provider_Type: 2,
        signature_Flag: '', // You can set this as needed
        signature_Date: ' ', // You can set this as needed
        npi: newRow.npi,
        firstName: newRow.hcp_first_Name,
        middleName: newRow.hcp_middle_Name,
        lastName: newRow.hcp_last_Name,
        specialty1: "plastic",
        address1: "cannonvalley street",
        address2: "cannonvalley street",
        city: newRow.city,
        state: newRow.state,
        zip: newRow.zip,
        phone: newRow.phone,
        fax: 150990,
        email: newRow.email,
        createUser: newRow.createUser,
      };
   
      // Prepare the request body by converting formattedRow to JSON
      const requestBody = JSON.stringify(formattedRow);
  
      // Make the POST request to the API endpoint
      const response = await axios.post('/api/v1/fax/hcpInfo', requestBody, config);
  
      if (response.status === 200) {
        // Request was successful, you can handle the response here if needed
        console.log('Row saved successfully');
       
        // Update your local data after a successful response
        const updatedData = [...apiData, newRow];
        setApiData(updatedData);
  
        // Remove the saved new row from newRows
        const updatedNewRows = newRows.filter((row) => row.id !== newRow.id);
        setNewRows(updatedNewRows);
      } else {
        // Handle errors if the request was not successful
        console.error('Failed to save the row:', response.data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  

  const handleDeleteButtonClick = (rowId) => {
    
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setDeleteConfirmationOpen(false);
  };
 

  const confirmDelete = () => {
   // setDeleteConfirmationOpen(false);
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
  const handleOfficeAddressChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      address1: event.target.value,
    });
  };

  const handleCityChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      city: event.target.value,
    });
  };


  const handleZipChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      zip: event.target.value,
    });
  };
  console.log("editableOfficeDatawwww", editableOfficeData);
  
  const handleStateChange = (event) => {
    setEditableOfficeData({
      ...editableOfficeData,
      state: event.target.value,
    });
  };
  const handleAddEmptyRow = () => {
    // Create a new row with empty fields
    const newId = apiData.length + newRows.length + 1;
    const newRowWithId = { id: newId, hcp_first_Name: '', hcp_middle_Name: '', hcp_last_Name: '', npi: '' };
    setNewRows([...newRows, newRowWithId]);
  };

  // const handleSaveNewRow = (newRow) => {
  //   // Save the new row by appending it to the API data
  //   const updatedData = [...apiData, newRow];
  //   setApiData(updatedData);

  //   // Remove the saved new row from newRows
  //   const updatedNewRows = newRows.filter((row) => row.id !== newRow.id);
  //   setNewRows(updatedNewRows);
  // };

  const handleCancelNewRow = (newRowId) => {
    // Remove the canceled new row from newRows
    const updatedNewRows = newRows.filter((row) => row.id !== newRowId);
    setNewRows(updatedNewRows);
  };
  const handleEditColumnClick = (rowId, columnName) => {
    setEditingRowId(rowId);
    setEditingColumn(columnName);
  };
  
  return (
    <>
  <Button variant="contained" color="primary" onClick={handleAddEmptyRow}  style={{ float: 'right', marginTop: '1rem', marginRight: '1rem' }}>
        Add 
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Signed</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
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
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={row.hcp_first_Name}
                      onChange={(e) => handleInputChange(row.id, e, 'hcp_first_Name')}
                    />
                  ) : (
                    row.hcp_first_Name
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <TextField
                      fullWidth
                      name="middlename"
                      label="Middle Name"
                      value={row.hcp_middle_Name}
                      onChange={(e) => handleInputChange(row.id, e, 'hcp_middle_Name')}
                    />
                  ) : (
                    row.hcp_middle_Name
                  )}
                </TableCell>
                <TableCell>
                  {editingRowId === row.id ? (
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={row.hcp_last_Name}
                      onChange={(e) => handleInputChange(row.id, e, 'hcp_last_Name')}
                    />
                  ) : (
                    row.hcp_last_Name
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
                      <Button
                        onClick={() => handleSaveRowClick(row.id)}
                        variant="outlined"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => handleDeleteButtonClick(row.id)}
                        variant="outlined"
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEditRowClick(row.id)}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteButtonClick(row.id)}
                        variant="outlined"
                        color="secondary"
                      >
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
                label="Address"
                name="address1"
                type="address1"
                value={editableOfficeData.address1}
                onChange={handleOfficeAddressChange}
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
    <MenuItem key={state.stateName} value={state.shortName}>
    {state.stateName}
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