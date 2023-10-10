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
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  
  export default function KitNumberInfo() {
    const [woundData, setWoundData] = useState([]);
    const [isAddClicked, setIsAddClicked] = useState(false);
    const [newRowData, setNewRowData] = useState({
      kitNumber: '',
      frequency: '',
      wnd1: false,
      wnd2: false,
      wnd3: false,
    });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);

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
          const response = await axios.get('/api/v1/fax/productInfo', config);
          const responseData = response.data;
          console.log(responseData);
          console.log(responseData);
          if (responseData && responseData.data && responseData.data.length > 0) {
            // Update the woundData state variable with the retrieved data
            setWoundData(responseData.data);
          } else {
            // Handle the case where no wound data is found.
            console.error('No wound data found.');
          }
        } catch (error) {
          console.error('Error fetching wound data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleAddButtonClick = () => {
      setIsAddClicked(true);
    };
  
    const handleNewRowChange = (column, value) => {
      setNewRowData({ ...newRowData, [column]: value });
    };
  
    const handleCheckboxChange = (column) => {
      setNewRowData({ ...newRowData, [column]: !newRowData[column] });
    };
  
    const handleSaveButtonClick = () => {
      // Save the data in newRowData to your backend or perform any necessary actions
      console.log('New Row Data:', newRowData);
      // Reset newRowData and setIsAddClicked to false
      setNewRowData({
        kitNumber: '',
        frequency: '',
        wnd1: false,
        wnd2: false,
        wnd3: false,
      });
      setIsAddClicked(false);
    };
  
    const handleDeleteButtonClick = (index) => {
      // Implement logic to delete the row at the specified index
      setSelectedRowToDelete(index);
      setDeleteConfirmationOpen(true);
    };
    const confirmDelete = () => {
        if (selectedRowToDelete !== null) {
          // Implement logic to delete the selected row
          const updatedWoundData = [...woundData];
          updatedWoundData.splice(selectedRowToDelete, 1);
          setWoundData(updatedWoundData);
        }
        setDeleteConfirmationOpen(false);
        setSelectedRowToDelete(null);
      };
    
      const cancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setSelectedRowToDelete(null);
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
                <TableCell style={{ minWidth: 10 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {woundData.map((wound, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select
                      value={wound.productCode}
                      // Implement onChange handler for kitNumber
                    >
                        <MenuItem value={wound.productCode}>{wound.productCode}</MenuItem>
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                      {/* Populate dropdown options for kitNumber */}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={wound.frequency}
                      // Implement onChange handler for frequency
                    >
                         <MenuItem value={wound.productCode}>Location1</MenuItem>
                    <MenuItem value="Location1">Location2</MenuItem>
                    <MenuItem value="Location2">Location3</MenuItem>
                      {/* Populate dropdown options for frequency */}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd1}
                          // Implement onChange handler for wnd1
                        />
                        
                      }
                      label="(WND)1"
                    />
                    
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd2}
                          // Implement onChange handler for wnd2
                        />
                      }
                      label="(WND)2"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={wound.wnd3}
                          // Implement onChange handler for wnd3
                        />
                      }
                      label="(WND)3"
                    />
                  </TableCell>
                  <TableCell>
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
                    <Select
                      value={newRowData.productCode}
                      onChange={(e) => handleNewRowChange('kitNumber', e.target.value)}
                    >
                      {/* Populate dropdown options for kitNumber */}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={newRowData.frequency}
                      onChange={(e) => handleNewRowChange('frequency', e.target.value)}
                    >
                      {/* Populate dropdown options for frequency */}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRowData.wnd1}
                          onChange={() => handleCheckboxChange('wnd1')}
                        />
                      }
                      label="(WND)1"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newRowData.wnd2}
                          onChange={() => handleCheckboxChange('wnd2')}
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
                          onChange={() => handleCheckboxChange('wnd3')}
                        />
                      }
                      label="(WND)3"
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
  