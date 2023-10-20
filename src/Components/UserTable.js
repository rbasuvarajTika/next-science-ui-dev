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
import { Link } from 'react-router-dom';
import axiosBaseURL from './axios.js';

const columns = [
  { id: 'username', label: 'User Id', minWidth: 170 },
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  {
    id: 'lastName',
    label: 'Last name',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'userType',
    label: 'Type',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'userStatusFlag',
    label: 'Status',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'edit',
    //label: 'Edit',
    label: ' ',
    minWidth: 60,
    align: 'center',
  },
];

export default function UserTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = props.searchUser;
  const statusFilter = props.statusFilter;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosBaseURL.get('/api/v1/users/usersList', config);
        setUsers(response.data.data.data);
        setLoading(false);
        console.log('Error fetching data',response.data.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredUsers = users ? users : [];

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {filteredUsers
              .filter((item) => String(item.username).toLowerCase().includes(user))
              .filter((item) => {
                if (statusFilter === 'All Users') {
                  return true;
                } else if (statusFilter === 'Active Users') {
                  return item.userStatusFlag === 'Active';
                } else if (statusFilter === 'Deactivated Users') {
                  return item.userStatusFlag === 'Deactivated';
                }
                return false;
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === 'edit') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Link to={`/nsrxmgt/edit-user/${row.userId}`} state={{ user: row }}>
                              <button >Edit</button>
                            </Link>
                          </TableCell>
                        );
                      }
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
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
