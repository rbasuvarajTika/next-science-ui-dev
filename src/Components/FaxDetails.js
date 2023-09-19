// FaxDetails.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function FaxDetails({ faxData }) {
    if (!faxData) {
        // Handle the case when faxData is null or undefined
        return <div>No fax data available</div>;
      }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="fax-details-table">
        <TableHead>
          <TableRow>
            <TableCell>Detail</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Fax ID</TableCell>
            <TableCell>{faxData.faxId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Case ID</TableCell>
            <TableCell>{faxData.caseId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fax Status</TableCell>
            <TableCell>{faxData.faxStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Main Fax ID</TableCell>
            <TableCell>{faxData.mainFaxId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fax Date</TableCell>
            <TableCell>{faxData.faxDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fax Number</TableCell>
            <TableCell>{faxData.faxNumber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FaxDetails;
