import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogBox1 from './DialogBox1';
import DialogBox2 from './DialogBox2';

const TablePage = () => {


  const [usersData, setUsersData] = useState([])

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

 const getUserData = async() =>{
  const url = "http://localhost:5000/users"
  let result = await fetch(url);
  result= await result.json();
  console.log("ge user data===>",usersData);
  setUsersData(result)
  
 }

 const deleteUser = async(id) =>{
  const url = "http://localhost:5000/users"
  let result = await fetch(`${url}/${id}` ,{
    method:"DELETE",
  })
  getUserData()

result = result.json();
console.log(result);
 }

 useEffect(() => {
  getUserData()
 }, [])
 


  return (
    <>
    <div style={{height:"100vh"}}>
      <div style={{margin:"10px"}}>
      <DialogBox1 />

      </div>
      <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SR No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Mobile</TableCell>
            <TableCell align="right">Email_Id</TableCell>
            <TableCell align="right">Birthday</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((row) => (
            <TableRow
              // key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">
              <DialogBox2 user={row} />
              <Button variant="contained" sx={{marginLeft:"10px"}} onClick={() => deleteUser(row.id)} >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

    </div>
    </>
  )
}

export default TablePage