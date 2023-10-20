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
import axiosBaseURL from './axios.js';

export default function WoundInfoTable() {
  const [woundData, setWoundData] = useState([]);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [selectedRowToDelete, setSelectedRowToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
  const [trnFaxId, setTrnFaxId] = useState([]);
  const [woundNo, setwoundNo] = useState([]);


  const { trnRxId } = useParams();

  const [newRowData, setNewRowData] = useState({
    trnFaxId:trnRxId,
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
        const response = await axiosBaseURL.get(`/api/v1/fax/woundInfo/${trnRxId}`, config);
        const responseData = response.data;
        const trnFaxId = responseData.data[0].trnFaxId;
        const woundNo = responseData.data[0].woundNo;
        setwoundNo(woundNo);
        console.log("woundN  ssso", woundNo);

        setTrnFaxId(trnFaxId);
        console.log("woundInforesponse",trnFaxId);
        console.log(responseData);
        if (responseData && responseData.data && responseData.data.length > 0) {
          // Update the woundData state variable with the retrieved data
          setWoundData(responseData.data);
         
          console.log(response.data);
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
  const handleSaveButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make a POST request to the API to save the new row data
      const response = await axiosBaseURL.post(`/api/v1/fax/woundInfo`, newRowData, config);
  
      if (response.status === 200) {
        // The data was successfully saved. You can handle the success here.
        console.log('Data saved successfully.');
  
        // Reset newRowData and setIsAddClicked to false
        setNewRowData({
          trnFaxId:trnFaxId,
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
      } else {
        // Handle any errors or validation issues here.
        console.error('Error saving data:', response.data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  const handleSaveEditClick = async (index, woundId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const updatedWoundData = woundData[index];
  
      // Make a PUT request to update the edited wound data
      const response = await axiosBaseURL.put(`/api/v1/fax/woundInfo`, updatedWoundData, config);
      //const woundNo = response.data.data.woundNo
    
      if (response.status === 200) {
        // The data was successfully updated. You can handle the success here.
        console.log('Data updated successfully.');
  
        // Reset the selected row for editing
        setSelectedRowToEdit(null);
      } else {
        // Handle any errors or validation issues here.
        console.error('Error updating data:', response.data);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  const handleAddButtonClick = () => {
    setIsAddClicked(true);
  };

  const handleNewRowChange = (column, value) => {
    setNewRowData({ ...newRowData, [column]: value });
  };

 

  const handleCancelClick = () => {
    // Reset newRowData and setIsAddClicked to false when cancel is clicked
    setNewRowData({
      trnFaxId:trnFaxId,
      woundNo: '',
      woundLocation: '',
      woundLength: '',
      woundWidth: '',
      woundDepth: '',
      woundThickness:'',
      woundType: '',
      drainage: '',
      debrided: '',
      icdCode: '',
      debridedDate: '',
      debridedType:'',
      
    });
    setIsAddClicked(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
     setSelectedRowToDelete(null);
   };

  const handleEditButtonClick = (index) => {
     setSelectedRowToEdit(index);
   };

  const handleDeleteButtonClick = (index) => {
    // Set the selected row to delete
    setSelectedRowToDelete(index);
  
    // Open the delete confirmation dialog
    setDeleteConfirmationOpen(true);
  };
  
  const confirmDelete = async () => {
    if (selectedRowToDelete !== null) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Prepare the body data for the delete request
        const dataToDelete = {
          trnFaxId: trnRxId,
          woundNo:woundNo,
        };
  
        // Make a DELETE request to delete the selected wound using its ID
        const woundIdToDelete = woundData[selectedRowToDelete].woundId; // Adjust this according to your data structure
  
        const response = await axiosBaseURL.delete(`/api/v1/fax/woundInfoDetails`, {
          ...config,
          data: dataToDelete,
        });
  
        if (response.status === 200) {
          // The data was successfully deleted. You can handle the success here.
          console.log('Data deleted successfully.');
  
          // Update your UI to reflect the deleted row
          const updatedWoundData = [...woundData];
          updatedWoundData.splice(selectedRowToDelete, 1);
          setWoundData(updatedWoundData);
        } else {
          // Handle any errors or validation issues here.
          console.error('Error deleting data:', response.data);
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  
    // Close the delete confirmation dialog and reset the selected row
    setDeleteConfirmationOpen(false);
    setSelectedRowToDelete(null);
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
              <TableCell style={{ minWidth: 140 }}>ICD-10 Code</TableCell>
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
            <Select
          value={wound.woundLocation}
         onChange={(e) => handleEditRowChange(index, 'woundLocation', e.target.value)}
         >
          <MenuItem value={wound.woundLocation}>{wound.woundLocation}</MenuItem>
          <MenuItem value="LT">LT</MenuItem>
          <MenuItem value="RT">RT</MenuItem>
      {/* Add more MenuItem options as needed */}
    </Select>
  ) : (
    <Select
    value={wound.woundLocation}
   onChange={(e) => handleEditRowChange(index, 'woundLocation', e.target.value)}
   >
    <MenuItem value={wound.woundLocation}>{wound.woundLocation}</MenuItem>
   <MenuItem value="LT">LT</MenuItem>
   <MenuItem value="RT">RT</MenuItem>
{/* Add more MenuItem options as needed */}
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
                  {/* <TableCell> {selectedRowToEdit === index ? (
                    <TextField
                      type="text"
                      value={wound.woundType}
                      onChange={(e) => handleEditRowChange(index, 'woundType', e.target.value)}
                    />
                  ) : (
                    wound.woundType
                  )}</TableCell> */}
                <TableCell> {selectedRowToEdit === index ? (
                   
                      
                   <Select value={wound.woundType}
                   onChange={(e) => handleEditRowChange(index, 'woundType', e.target.value)}>
                 <MenuItem value={wound.woundType}>{wound.woundType}</MenuItem>
                 <MenuItem value="i">i</MenuItem>
                    <MenuItem value="ii">ii</MenuItem>
                    <MenuItem value="iii">iii</MenuItem>
                    <MenuItem value="iv">iv</MenuItem>
               </Select>
                 
               ) : (
                 <Select value={wound.woundType} 
                 onChange={(e) => handleEditRowChange(index, 'woundType', e.target.value)}>
                 <MenuItem value={wound.woundType}>{wound.woundType}</MenuItem>
                 <MenuItem value="i">i</MenuItem>
                    <MenuItem value="ii">ii</MenuItem>
                    <MenuItem value="iii">iii</MenuItem>
                    <MenuItem value="iv">iv</MenuItem>
               </Select>
               )}</TableCell>
                <TableCell> {selectedRowToEdit === index ? (
                   
                      
                      <Select value={wound.drainage}
                      onChange={(e) => handleEditRowChange(index, 'drainage', e.target.value)}>
                    <MenuItem value={wound.drainage}>{wound.drainage}</MenuItem>
                    <MenuItem value="Dry">Dry</MenuItem>
                    <MenuItem value="Mod">Mod</MenuItem>
                    <MenuItem value="Hvy">Hvy</MenuItem>
                  </Select>
                    
                  ) : (
                    <Select value={wound.drainage} 
                    onChange={(e) => handleEditRowChange(index, 'drainage', e.target.value)}>
                    <MenuItem value={wound.drainage}>{wound.drainage}</MenuItem>
                    <MenuItem value="Dry">Dry</MenuItem>
                    <MenuItem value="Mod">Mod</MenuItem>
                    <MenuItem value="Hvy">Hvy</MenuItem>
                  </Select>
                  )}</TableCell>
                    <TableCell> {selectedRowToEdit === index ? (
                   
                      
                   <Select value={wound.debrided}
                   onChange={(e) => handleEditRowChange(index, 'debrided', e.target.value)}>
                 <MenuItem value={wound.debrided}>{wound.debrided}</MenuItem>
                 <MenuItem value="1">1</MenuItem>
                 <MenuItem value="2">2</MenuItem>
                 
               </Select>
                 
               ) : (
                 <Select value={wound.debrided} 
                 onChange={(e) => handleEditRowChange(index, 'debrided', e.target.value)}>
                 <MenuItem value={wound.debrided}>{wound.debrided}</MenuItem>
                 <MenuItem value="1">1</MenuItem>
                 <MenuItem value="2">2</MenuItem>
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
                    wound.debridedDate
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
                   type="text"
                    value={newRowData.woundNo}
                    onChange={(e) => handleNewRowChange('woundNo', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                <Select
      value={newRowData.woundLocation}
      onChange={(e) => handleNewRowChange('woundLocation', e.target.value)}
     
    >
      <MenuItem value={newRowData.woundLocation}>{newRowData.woundLocation}</MenuItem>
      <MenuItem value="RT">RT</MenuItem>
      <MenuItem value="LT">LT</MenuItem>
      {/* Add more MenuItem options as needed */}
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
                  
                  <Select
      value={newRowData.woundType}
      onChange={(e) => handleNewRowChange('woundType', e.target.value)}
     
    >
      <MenuItem value={newRowData.woundType}>{newRowData.woundType}</MenuItem>
                    <MenuItem value="i">i</MenuItem>
                    <MenuItem value="ii">ii</MenuItem>
                    <MenuItem value="iii">iii</MenuItem>
                    <MenuItem value="iv">iv</MenuItem>
      {/* Add more MenuItem options as needed */}
    </Select>
                </TableCell>
                
                <TableCell>
         <Select
      value={newRowData.drainage}
      onChange={(e) => handleNewRowChange('drainage', e.target.value)}
     
    >
      <MenuItem value={newRowData.drainage}>{newRowData.drainage}</MenuItem>
                    <MenuItem value="Dry">Dry</MenuItem>
                    <MenuItem value="Mod">Mod</MenuItem>
                    <MenuItem value="Hvy">Hvy</MenuItem>
      {/* Add more MenuItem options as needed */}
    </Select>
    </TableCell>
    <TableCell>
         <Select
      value={newRowData.debrided}
      onChange={(e) => handleNewRowChange('debrided', e.target.value)}
     
    >
      <MenuItem value={newRowData.debrided}>{newRowData.debrided}</MenuItem>
                 <MenuItem value="1">1</MenuItem>
                 <MenuItem value="2">2</MenuItem>
      {/* Add more MenuItem options as needed */}
    </Select>
    </TableCell>
               
                {/* <TableCell>
                  <Select
                    value={newRowData.debrided}
                    onChange={(e) => handleNewRowChange('debrided', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell> */}
                <TableCell>
                  <TextField
                    value={newRowData.icdCode}
                    onChange={(e) => handleNewRowChange('icdCode', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newRowData.debridedDate}
                    onChange={(e) => handleNewRowChange('debridedDate', e.target.value)}
                  />
                </TableCell>
                {/* <TableCell>
                  <Select
                    value={newRowData.debridedDate}
                    onChange={(e) => handleNewRowChange('debridedDate', e.target.value)}
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                  </Select>
                </TableCell> */}
                <TableCell>
                  <TextField
                    value={newRowData.debridedType}
                    onChange={(e) => handleNewRowChange('debridedType', e.target.value)}
                  />
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
      <KitNumberInfo trnRxId={trnRxId} trnFaxId={trnFaxId}/>
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