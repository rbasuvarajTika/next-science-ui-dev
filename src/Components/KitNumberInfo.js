import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    MenuItem,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useParams } from 'react-router-dom';

  
  export default function KitNumberInfo() {
    const [woundData, setWoundData] = useState([]);
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [trnFaxId, setTrnFaxId] = useState([]);
    const [productCode, setproductCode] = useState([]);
    const [editMode, setEditMode] = useState(Array(woundData.length).fill(false));



    const [newRowData, setNewRowData] = useState({
      trnFaxId:trnFaxId,
      productCode: '',
      frequency: '',
      wnd1: false,
      wnd2: false,
      wnd3: false,
      wnd4: false,
    });
 
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);

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

        // Make a GET request to the API to fetch wound data
        const response = await axios.get(`/api/v1/fax/productInfo/${trnRxId}`, config);
        const responseData = response.data;
       // const productCodes = responseData.data.map((item) => item.productCode);
        console.log("fax",responseData);
        if (responseData && responseData.data && responseData.data.length > 0) {
          const trnFaxId = responseData.data[0].trnFaxId;
          const productCode = responseData.data[0].productCode;

         // const productCodes = responseData.data.map((item) => item.productCode);
          setTrnFaxId(trnFaxId);
          setproductCode(productCode);
          console.log( "productCode:",productCode);
          setWoundData(responseData.data);
         // console.log("responseData.data.trnFaxId",productCode);
           
          // Update the woundData state variable with the retrieved data
         
          
          // Handle the case where no wound data is found.
          console.error('No wound data found.');
        }
      } catch (error) {
        console.error('Error fetching wound data:', error);
      }
    };

    fetchData();
  }, []);
  const handleSaveButtonClick = () => {
    // Create an object to send to the API
    const dataToSave = {
      trnFaxId: trnFaxId,
      productCode: newRowData.productCode,
      quantity: 2,
      frequency: newRowData.frequency,
      wnd1: newRowData.wnd1 ? 1 : 0,
      wnd2: newRowData.wnd2 ? 1 : 0,
      wnd3: newRowData.wnd3 ? 1 : 0,
      wnd4: newRowData.wnd4 ? 1 : 0,
    };
  
    // Get the token from your authentication mechanism, e.g., localStorage
    const token = localStorage.getItem('token');
  
    // Define the request headers with the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    // Send a POST request to the API with the headers
    axios
      .post('/api/v1/fax/productInfo', dataToSave, config)
      .then((response) => {
        // Handle the response from the API if needed
        console.log('Data saved successfully:', response.data);
  
        // Update the woundData state with the saved data
        const updatedWoundData = [...woundData, newRowData];
        setWoundData(updatedWoundData);
  
        // Set selectedRowToEdit to the index of the newly saved row
        const newIndex = updatedWoundData.length - 1;
        setSelectedRowToEdit(newIndex);
  
        // Reset newRowData and setIsAddClicked to false
        setNewRowData({
          trnFaxId: trnFaxId,
          productCode: '',
          quantity: '',
          frequency: '',
          wnd1: false,
          wnd2: false,
          wnd3: false,
          wnd4: false,
        });
        setIsAddClicked(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error saving data:', error);
      });
  };
  
    console.log("trnFaxId",trnFaxId);
    
    console.log("productCode",productCode);

    const handleSaveEditClick = (index) => {
      const editedData = {
        // Construct the edited data based on the specific entry to edit
        trnFaxId: trnFaxId,
        productCode:productCode,
        quantity: 2,
        frequency: woundData[index].frequency,
        wnd1: woundData[index].wnd1 ? 1 : 0,
        wnd2: woundData[index].wnd2 ? 1 : 0,
        wnd3: woundData[index].wnd3 ? 1 : 0,
        wnd4: woundData[index].wnd4 ? 1 : 0,
      };
    
      // Get the token from your authentication mechanism, e.g., localStorage
      const token = localStorage.getItem('token');
    
      // Define the request headers with the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
      // Send a PUT or PATCH request to the API to update the data
      axios
        .put(`/api/v1/fax/productInfo`, editedData, config) // Replace `id` with the actual identifier for the edited data
        .then((response) => {
          // Handle the response from the API if needed
          console.log('Data saved successfully:', response.data);
    
          // Reset the selected row for editing
          setSelectedRowToEdit(null);
          
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error saving edited data:', error);
        });
    };

    const handleDeleteButtonClick = (index) => {
      // Implement logic to prompt the user for confirmation, display a confirmation dialog, or proceed with the deletion directly
      setSelectedRowToDelete(index);
      setDeleteConfirmationOpen(true);
    };
    
    const confirmDelete = () => {
      if (selectedRowToDelete !== null) {
        // Define the data to be sent in the DELETE request body
        const dataToDelete = {
          trnFaxId: 9,
          productCode: productCode,
        };
    
        // Get the token from your authentication mechanism, e.g., localStorage
        const token = localStorage.getItem('token');
    
        // Define the request headers with the Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: dataToDelete, // Include the data in the request body
        };
    
        // Send a DELETE request to the API to delete the data
        axios
          .delete(`/api/v1/fax/productInfoDetails`, config)
          .then((response) => {
            // Handle the response from the API if needed
            console.log('Data deleted successfully:', response.data);
    
            // Update the woundData state to reflect the deleted data
            const updatedWoundData = [...woundData];
            updatedWoundData.splice(selectedRowToDelete, 1);
            setWoundData(updatedWoundData);
          })
          .catch((error) => {
            // Handle any errors that occurred during the request
            console.error('Error deleting data:', error);
          });
    
        // Close the confirmation dialog and reset the selectedRowToDelete
        setDeleteConfirmationOpen(false);
        setSelectedRowToDelete(null);
      }
    };
    
    const cancelDelete = () => {
      // Close the confirmation dialog and reset the selectedRowToDelete
      setDeleteConfirmationOpen(false);
      setSelectedRowToDelete(null);
    };
    
   
    const handleAddButtonClick = () => {
      setNewRowData({
        trnFaxId: trnFaxId,
        productCode: '',
        frequency: '',
        wnd1: false,
        wnd2: false,
        wnd3: false,
        wnd4: false,
      });
      setIsAddClicked(true);
    };
    
  
    const handleNewRowChange = (column, value) => {
      setNewRowData({ ...newRowData, [column]: value });
    };
  
    const handleCheckboxChange = (column, index) => {
      const updatedWoundData = [...woundData];
      updatedWoundData[index][column] = !updatedWoundData[index][column];
      setWoundData(updatedWoundData);
    };
   

    const handleEditButtonClick = (index) => {
      // Set the selectedRowToEdit to the index of the row you want to edit
      setSelectedRowToEdit(index);
    };
    
    
      const handleCancelEditClick = () => {
        // Reset the selected row for editing when the user cancels
        setSelectedRowToEdit(null);
      };
      const handleEditRowChange = (index, column, value) => {
        const updatedWoundData = [...woundData];
        updatedWoundData[index][column] = value;
        setWoundData(updatedWoundData);
      };
    
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ float: 'right', marginTop: '1rem', marginRight: '1rem' }}
          onClick={handleAddButtonClick}
        >
          Add
        </Button>
        <TableContainer component={Paper} style={{ width: '100%', marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 10 }}>Kit Number</TableCell>
                <TableCell style={{ minWidth: 10 }}>Frequency</TableCell>
                <TableCell style={{ minWidth: 10 }}>(WND)1</TableCell>
                <TableCell style={{ minWidth: 10 }}>(WND)2</TableCell>
                <TableCell style={{ minWidth: 10 }}>(WND)3</TableCell>
                <TableCell style={{ minWidth: 10 }}>(WND)4</TableCell>
                <TableCell style={{ minWidth: 10 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {woundData.map((wound, index) => (
                <TableRow key={index}>
                 <TableCell>
                  {/* Render either a Select or a TextField based on the selectedRowToEdit state */}
                  {selectedRowToEdit === index ? (
                    <TextField
                      value={wound.productCode}
                      onChange={(e) => handleEditRowChange(index, 'productCode', e.target.value)}
                    />
                  ) : (
                    <Select value={wound.productCode}>
                      <MenuItem value={wound.productCode}>{wound.productCode}</MenuItem>
                      {/* ... Populate dropdown options for kitNumber */}
                    </Select>
                  )}
                </TableCell>
                <TableCell>
                  {/* Render either a Select or a TextField based on the selectedRowToEdit state */}
                  {selectedRowToEdit === index ? (
                    <TextField
                      value={wound.frequency}
                      onChange={(e) => handleEditRowChange(index, 'frequency', e.target.value)}
                    />
                  ) : (
                    <Select value={wound.frequency} >
                      <MenuItem value={wound.frequency}>{wound.frequency}</MenuItem>
                      {/* ... Populate dropdown options for frequency */}
                    </Select>
                  )}
                </TableCell>
                  <TableCell>
                    
                    <FormControlLabel
                      control={
                        <Checkbox
                        onChange={(e) => handleEditRowChange(index, 'wnd1', e.target.checked)} // Use e.target.checked

                          checked={wound.wnd1}
                          // Implement onChange handler for wnd1
                        />
                        
                      }
                   
                    />
                    
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd2}
                          onChange={(e) => handleEditRowChange(index, 'wnd2', e.target.checked)}
                          // Implement onChange handler for wnd2
                        />
                      }
                    
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd3}
                          onChange={(e) => handleEditRowChange(index, 'wnd3', e.target.checked)}
                          // Implement onChange handler for wnd3
                        />
                      }
                      
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd4}
                          onChange={(e) => handleEditRowChange(index, 'wnd4', e.target.checked)}
                          // Implement onChange handler for wnd3
                        />
                      }
                      
                    />
                  </TableCell>
                  <TableCell>
                  {/* Include "Edit" and "Save" buttons based on selectedRowToEdit state */}
                  {selectedRowToEdit === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveEditClick(index)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditButtonClick(index)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
                            <TableCell>
                  {/* Include "Delete" button */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteButtonClick(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
                </TableRow>
              ))}
  
              {isAddClicked && (
                <TableRow>
                  <TableCell>
                    <TextField
                      value={newRowData.productCode}
                      onChange={(e) => handleNewRowChange('productCode', e.target.value)}
                    
                     
                    />
                  </TableCell>
                  <TableCell>
                  <TextField
                      value={newRowData.frequency}
                      onChange={(e) => handleNewRowChange('frequency', e.target.value)}
                   
                      />
                  </TableCell>
                  <TableCell >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRowData.wnd1}
                         
                          onChange={(e) => handleNewRowChange('wnd1', e.target.checked)}
                          // Pass the column name and the checked value

                        />
                      }
                      label="(WND)1"
                    />
                  </TableCell>
                  <TableCell >
                    <FormControlLabel
                      control={
                        <Checkbox
                        checked={newRowData.wnd2}
                        onChange={(e) => handleNewRowChange('wnd2', e.target.checked)}

                        />
                      }
                      label="(WND)2"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRowData.wnd3}
                          onChange={(e) => handleNewRowChange('wnd3', e.target.checked)}

                        />
                      }
                      label="(WND)3"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRowData.wnd4}
                          onChange={(e) => handleNewRowChange('wnd4', e.target.checked)}

                        />
                      }
                      label="(WND)4"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
                      Save
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setIsAddClicked(false)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              )}
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
      </div>
    );
  }
  