import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
  } from '@mui/material';
  import React, { useState, useEffect } from 'react';
import axios from 'axios';
  export default function WoundInfoTable() {
    const [woundData, setWoundData] = useState([]);
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
            const response = await axios.get('/api/v1/fax/rxTrackerWoundList', config);
            const responseData = response.data;
           //console.log(responseData);
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
      
    return (
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
            {woundData.map((wound) => (
              <TableRow key={wound.id}>
                <TableCell>{wound.woundNo}</TableCell>
                <TableCell>{wound.woundLocation}</TableCell>
                <TableCell>{wound.woundLength}</TableCell>
                <TableCell>{wound.woundWidth}</TableCell>
                <TableCell>{wound.woundDepth}</TableCell>
                <TableCell>{wound.woundThickness}</TableCell>
                <TableCell>{wound.drainage}</TableCell>
                <TableCell>{wound.debrided}</TableCell>
                <TableCell>{wound.icdCode}</TableCell>
                <TableCell>{wound.debridedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  