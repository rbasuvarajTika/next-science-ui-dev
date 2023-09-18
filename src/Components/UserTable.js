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
import { Link ,useNavigate  } from 'react-router-dom';

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
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 60,
    align: 'center',
  },
];

export default function UserTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState([]);
   // State to store the selected user for editing
  const user = props.searchUser;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/api/v1/users/userList', config);
        setUsers(response.data.data.data);
        console.log(response.data.data.data);

      } catch (error) {
        console.error('Error fetching data:', error);
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

  //  const handleEditClick = (row) => {
  //    setSelectedUser(row);
  //    navigate(`/edituser/${row.userId}`); // Set the selected user for editing
  //    console.log(navigate);
  //  };

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
              .filter((item) => String(item.username).toLowerCase().includes(user))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === 'edit') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                       <Link to={`/edit-user/${row.userId}`} state={{ user: row  }}>   <button >Edit</button></Link>
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
