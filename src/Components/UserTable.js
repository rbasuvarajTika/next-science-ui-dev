import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'user_id', label: 'User Id', minWidth: 170 },
  { id: 'first_name', label: 'First Name', minWidth: 100 },
  {
    id: 'last_name',
    label: 'Last name',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',

  },
];

export default function UserTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState([]); // State to hold user data from the API
  const user = props.searchUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Include the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,

          },
          
        };
        console.log(config);
        const response = await axios.get('/api/v1/users/getUser', config); // Include the token in the request
        setUsers(response.data.data); // Update state with the fetched data
        console.log(response.data.data);
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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {users
              .filter((item) => item.first_name.toLowerCase().includes(user))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
