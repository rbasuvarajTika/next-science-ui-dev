import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PagingTabs from './PagingTabs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete
import { Link } from 'react-router-dom';

const columns = [
  { id: 'faxId', label: 'Fax ID', minWidth: 150 },
  { id: 'caseId', label: 'Case ID', minWidth: 100 },
  { id: 'faxStatus', label: 'Fax Status', minWidth: 170 },
  { id: 'dupeFaxId', label: 'Main Fax ID', minWidth: 170 },
  { id: 'faxDate', label: 'Fax Date', minWidth: 170 },
  { id: 'faxNumber', label: 'Fax Number', minWidth: 170 },
  { id: 'ocrStatus', label: 'Ocr Status', minWidth: 100 },
];

export function FaxTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [faxes, setFaxes] = useState([]); // State to hold fax data from the API
  const [searchFax, setSearchFax] = useState(''); // State for search input
  const [selectedOcrStatus, setSelectedOcrStatus] = useState(''); // State for selected ocrStatus

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/api/v1/fax/faxList', config);
        setFaxes(response.data.data.data); // Update state with the fetched data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run once when the component mounts

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Add a function to handle search input changes
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchFax(searchText); // Update the searchFax state with the search query
    setPage(0);
  };

  // Add a function to handle ocrStatus selection
  const handleOcrStatusChange = (event, newValue) => {
    setSelectedOcrStatus(newValue === "All Status" ? "" : newValue); // Update the selectedOcrStatus state
    setPage(0);
  };

  return (
    <>
      <PagingTabs />
      <Box
        sx={{
          width: '90%',
        }}
      >
        <Button variant="contained">Fax List</Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{  display: 'flex',
                justifyContent: 'space-between', // Align items to the right
                alignItems: 'center', // Center vertically
                width: '90%',
                marginBottom: '16px', }}>
          <Autocomplete
            sx={{ width: '20%' }}
            id="ocrStatus-filter"
            options={top100Films.map((film) => film.label)}
            value={selectedOcrStatus}
            onChange={handleOcrStatusChange}
            size='small'
            renderInput={(params) => (
              <TextField {...params} label="Filter by OCR Status" />
            )}
          />
          <TextField
            margin="normal"
            name="Search Fax"
            label="Search Fax"
            type="text"
            id="outlined-size-small"
            value={searchFax}
            size='small'
            onChange={handleSearchChange}
          />
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {faxes
                .filter((fax) =>
                  fax.faxId.toLowerCase().includes(searchFax.toLowerCase())
                )
                .filter((fax) =>
                  selectedOcrStatus
                    ? fax.ocrStatus === selectedOcrStatus
                    : true
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((fax) => {
                  let linkTo = ''; // Define linkTo here

                  if (fax.faxStatus === 'Main' || fax.faxStatus === 'New') {
                    linkTo = `/faxview/${fax.faxId}`;
                  } else if (fax.faxStatus === 'Duplicate') {
                    linkTo = `/duplicatefax/${fax.faxId}`;
                  }

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={fax.faxId}
                    >
                      {columns.map((column) => {
                        const value = fax[column.id];

                        if (column.id === 'faxId') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {linkTo ? (
                                <Link
                                  to={linkTo}
                                  state={{
                                    faxId: fax.faxId,
                                    caseId: fax.caseId,
                                    faxStatus: fax.faxStatus,
                                    mainFaxId: fax.dupeFaxId,
                                    faxDate: fax.faxDate,
                                    faxNumber: fax.faxNumber,
                                    ocrStatus: fax.ocrStatus
                                  }}
                                >
                                  {value}
                                </Link>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={faxes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
const top100Films = [
  { label: 'All Status', year: 1994 },
  { label: 'Complete', year: 1972 },
  { label: 'Incomplete', year: 1974 },
];
