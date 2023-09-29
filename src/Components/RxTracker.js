import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import PagingTabs from './PagingTabs';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router



const columns = [
    { id: 'trnRxId', label: 'Rx ID', minWidth: 50 },
    { id: 'faxId', label: 'Fax ID', minWidth: 50 },
    { id: 'caseId', label: 'Case ID', minWidth: 70, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'faxDate', label: 'Fax DATE', minWidth: 80, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'verifiedFlag', label: 'Verified FLAG', minWidth:100, align: 'right', format: (value) => value.toFixed(2) },
    // { id: 'Place of Service', label: 'Place of Service', minWidth:100, align: 'right', format: (value) => value.toFixed(2) },
    // { id: 'hcpName', label: 'Order Type', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    // { id: 'hcpNam', label: 'Wound Active', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    // { id: 'hcpNae', label: 'Rep Name', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    // { id: 'hcpNme', label: 'Rep Cell No', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    // { id: 'hcpame', label: 'Territory Name', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'hcName', label: 'HCP Name', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'hcpAddress1', label: 'HCP Address', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'hcpCity', label: 'HCP City', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'hcpState', label: 'HCP State', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'hcpZip', label: 'HCP Zip', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'accountName', label: 'Account Name', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'accAddress1', label: 'Account Address', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'accCity', label: 'Account City', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'accState', label: 'Account State', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'accZip', label: 'Account Zip', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'patientName', label: 'Patient Name', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'dateOfBirth', label: 'Date Of Birth', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'gender', label: 'GENDER', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'cellPhone', label: 'Cell Phone', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'workPhone', label: 'Work Phone', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'shipToAddress', label: 'Ship To Address', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'patientCity', label: 'Patient City', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'patientState', label: 'Patient State', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'patientZip', label: 'Patient Zip', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'patientZip4', label: 'Patient ZIP4', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'ssn', label: 'Patient SSN', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'mrn', label: 'Patient MRN', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'pmsId', label: 'Patient PMS ID', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'maritialStatus', label: 'Marital Status', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'emergencyContactName', label: 'Emergency Contact', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'emergencyContactPhone', label: 'Emergency Contact Phone', minWidth: 190, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'productCode', label: 'Product Code', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'productDisplayName', label: 'Product Display Name', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'wndCode', label: 'Wnd Code', minWidth: 100, align: 'right', format: (value) => value.toFixed(2) },
  ];
  

 

  export default function RxTracker(props) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/api/v1/fax/rxTrackerList', config);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <PagingTabs />
          <Box
        sx={{
          width: '90%',
          display: 'flex',
          
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',     // Center vertically
          margin: '1 auto',        // Center horizontally within the container
        }}
      >
            <Button variant="contained" style={{ bottom: '1rem' }}>
              RXTracker List
            </Button>
          </Box>
          <TableContainer sx={{ maxHeight: '80vh', overflowY: 'auto', overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                       key={row.trnRxId} // Use a unique identifier from your data
                        
                      >
                       {columns.map((column) => (
  <TableCell
    key={column.id}
    align={column.align}
    style={{ minWidth: column.minWidth }}
  >
    {column.id === 'trnRxId' ? (
      // Wrap the Rx ID in a Link component with the corresponding URL
      <Link to={`/casedetail/${row.trnRxId}`}>{row.trnRxId}</Link>
    ) : (
      // Render other columns as usual
      row[column.id]
    )}
  </TableCell>
))}

                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      );
    }

    
    
    
    
    
    