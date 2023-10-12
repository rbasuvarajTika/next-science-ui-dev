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
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KitNumberInfo from './KitNumberInfo';
import { useParams } from 'react-router-dom';


export default function WoundInfoTable() {
  const [woundData, setWoundData] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);

  const { trnRxId } = useParams();
console.log("trnFaxId", trnRxId);
  const [newRowData, setNewRowData] = useState({
    woundNo: '',
    woundLocation: '',
    woundLength: '',
    woundWidth: '',
    woundDepth: '',
    woundType: '',
    drainage: '',
    debrided: '',
    icdCode: '',
    debridedDate: '',
  });

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
        const response = await axios.get(`/api/v1/fax/woundInfo/${trnRxId}`, config);
        const responseData = response.data;

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

  const handleSaveButtonClick = () => {
    // Save the data in newRowData to your backend or perform any necessary actions
    console.log('New Row Data:', newRowData);
    // Reset newRowData and setIsAddClicked to false
    setNewRowData({
      woundNo: '',
      woundLocation: '',
      woundLength: '',
      woundWidth: '',
      woundDepth: '',
      woundType: '',
      drainage: '',
      debrided: '',
      icdCode: '',
      debridedDate: '',
    });
    setIsAddClicked(false);
  };

  const handleCancelClick = () => {
    // Reset newRowData and setIsAddClicked to false when cancel is clicked
    setNewRowData({
      woundNo: '',
      woundLocation: '',
      woundLength: '',
      woundWidth: '',
      woundDepth: '',
      woundType: '',
      drainage: '',
      debrided: '',
      icdCode: '',
      debridedDate: '',
    });
    setIsAddClicked(false);
  };
  const handleDeleteButtonClick = (index) => {
    // Implement logic to delete the row at the specified index
    // const updatedWoundData = [...woundData];
    // updatedWoundData.splice(index, 1);
    // setWoundData(updatedWoundData);
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

  const handleEditButtonClick = (index) => {
    setSelectedRowToEdit(index);
  };

  // Add a "Save" button click handler
  const handleSaveEditClick = (index) => {
    // Save the edited data to your backend or perform any necessary actions
    // Reset the selected row for editing
    setSelectedRowToEdit(null);
  };
  const handleEditRowChange = (index, column, value) => {
    const updatedWoundData = [...woundData];
    updatedWoundData[index][column] = value;
    setWoundData(updatedWoundData);
  };
  // Add a "Cancel" button click handler
  const handleCancelEditClick = () => {
    setSelectedRowToEdit(null);
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
              <TableCell style={{ minWidth: 10 }}>Wound</TableCell>
              <TableCell style={{ minWidth: 10 }}>Location</TableCell>
              <TableCell style={{ minWidth: 10 }}>Length</TableCell>
              <TableCell style={{ minWidth: 10 }}>Width</TableCell>
              <TableCell style={{ minWidth: 10 }}>Depth</TableCell>
              <TableCell style={{ minWidth: 10 }}>Wound Stage</TableCell>
              <TableCell style={{ minWidth: 10 }}>Drainage</TableCell>
              <TableCell style={{ minWidth: 10 }}>Debrided</TableCell>
              <TableCell style={{ minWidth: 10 }}>ICD-10 Code</TableCell>
              <TableCell style={{ minWidth: 10 }}>Debridement Date</TableCell>
              <TableCell style={{ minWidth: 10 }}>Debridement Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {woundData.map((wound ,index) => (
              <TableRow key={index}>
            <TableCell>
                  {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundNo}
                      onChange={(e) => handleEditRowChange(index, 'woundNo', e.target.value)}
                    />
                  ) : (
                    wound.woundNo
                  )}
                </TableCell>  
                    <TableCell>
                    {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundLocation}
                      onChange={(e) => handleEditRowChange(index, 'woundLocation', e.target.value)}
                    />
                  ) : (
                    <Select
                    value={wound.woundLocation}
                    // onChange={(e) => handleLocationChange(e, index)}
                  >
                    <MenuItem value={wound.woundLocation}>{wound.woundLocation}</MenuItem>
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                  )}
                  
                </TableCell>
                <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundLength}
                      onChange={(e) => handleEditRowChange(index, 'woundLength', e.target.value)}
                    />
                  ) : (
                    wound.woundLength
                  )}</TableCell>
                  <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundWidth}
                      onChange={(e) => handleEditRowChange(index, 'woundWidth', e.target.value)}
                    />
                  ) : (
                    wound.woundWidth
                  )}</TableCell>
                  <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundDepth}
                      onChange={(e) => handleEditRowChange(index, 'woundDepth', e.target.value)}
                    />
                  ) : (
                    wound.woundDepth
                  )}</TableCell>
                  <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundType}
                      onChange={(e) => handleEditRowChange(index, 'woundType', e.target.value)}
                    />
                  ) : (
                    wound.woundType
                  )}</TableCell>
                
                <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.drainage}
                      onChange={(e) => handleEditRowChange(index, 'drainage', e.target.value)}
                    />
                  ) : (
                    <Select value={wound.drainage}>
                    <MenuItem value={wound.drainage}>{wound.drainage}</MenuItem>
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                  )}</TableCell>
                    
                    <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.debrided}
                      onChange={(e) => handleEditRowChange(index, 'debrided', e.target.value)}
                    />
                  ) : (
                    <Select value={wound.debrided}>
                    <MenuItem value={wound.debrided}>{wound.debrided}</MenuItem>
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                  )}</TableCell>
                <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.icdCode}
                      onChange={(e) => handleEditRowChange(index, 'icdCode', e.target.value)}
                    />
                  ) : (
                    wound.icdCode
                  )}</TableCell>
                
                <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.debridedDate}
                      onChange={(e) => handleEditRowChange(index, 'debridedDate', e.target.value)}
                    />
                  ) : (
                    <Select value={wound.debridedDate}>
                    <MenuItem value={wound.debridedDate}>{wound.debridedDate}</MenuItem>
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                  )}</TableCell>
                <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.debridedType}
                      onChange={(e) => handleEditRowChange(index, 'debridedType', e.target.value)}
                    />
                  ) : (
                    wound.debridedType
                  )}</TableCell>
                <TableCell>
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
           <Button
              style={{top:'1.5rem'}}
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteButtonClick(index)}
            >
              Delete
            </Button>
              </TableRow>
            ))}

            {isAddClicked && (
              <TableRow>
                <TableCell>
                  <TextField
                    value={newRowData.woundNo}
                    onChange={(e) => handleNewRowChange('woundNo', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newRowData.woundLocation}
                    onChange={(e) => handleNewRowChange('woundLocation', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.woundLength}
                    onChange={(e) => handleNewRowChange('woundLength', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.woundWidth}
                    onChange={(e) => handleNewRowChange('woundWidth', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.woundDepth}
                    onChange={(e) => handleNewRowChange('woundDepth', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.woundType}
                    onChange={(e) => handleNewRowChange('woundType', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newRowData.drainage}
                    onChange={(e) => handleNewRowChange('drainage', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={newRowData.debrided}
                    onChange={(e) => handleNewRowChange('debrided', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.icdCode}
                    onChange={(e) => handleNewRowChange('icdCode', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={newRowData.debridedDate}
                    onChange={(e) => handleNewRowChange('debridedDate', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
                    Save
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </TableCell>
               
              </TableRow>
            )}
          </TableBody>
        </Table>
        
           

      </TableContainer>
      <KitNumberInfo trnRxId={trnRxId}/>
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