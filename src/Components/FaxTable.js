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
 import { Link } from 'react-router-dom';


const columns = [
  { id: 'faxId', label: 'Fax ID', minWidth: 170 },
  { id: 'caseId', label: 'Case ID', minWidth: 170 },
  { id: 'faxStatus', label: 'Fax Status', minWidth: 170 },
  { id: 'mainFaxId', label: 'Main Fax ID', minWidth: 170 },
  { id: 'faxDate', label: 'Fax Date', minWidth: 170 },
  { id: 'faxNumber', label: 'Fax Number', minWidth: 170 },
];

export function FaxTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [faxes, setFaxes] = useState([]); // State to hold fax data from the API
  const [searchFax, setSearchFax] = useState(''); // State for search input
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/fax/faxList', config);
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
    setSearchFax(searchText); // Update the searchFax state
  };

  // Filter faxes based on the search input
  const filteredFaxes = faxes.filter((fax) =>
    String(fax.faxId).toLowerCase().includes(searchFax)
  );

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
        <Box sx={{ width: '100%', marginBottom: '16px' }}>
          {/* Add the search input */}
          <TextField
            margin="normal"
            name="Search Fax"
            label="Search Fax"
            type="text"
            id="outlined-size-small"
            value={searchFax}
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
              {filteredFaxes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((fax) => {
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
                            <Link
                              to={`/faxview/${fax.faxId}`}
                              state={{
                                faxId: fax.faxId,
                                caseId: fax.caseId,
                                faxStatus: fax.faxStatus,
                                mainFaxId: fax.mainFaxId,
                                faxDate: fax.faxDate,
                                faxNumber: fax.faxNumber,
                              }}
                            >
                              {value}
                            </Link>
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
          count={filteredFaxes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Paper>
    </>
  );
}
