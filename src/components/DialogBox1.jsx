import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

export default function DialogBox1() {
  const [open, setOpen] = useState(false);
    const [name, setname] = useState('');
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState('');
    const [date, setdate] = useState("");


    const getUserData = async() =>{
        const url = "http://localhost:5000/users"
        let result = await fetch(url);
        result= await result.json();
        
        
       }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      addUserApi();
      getUserData();
  };

  const addUserApi = async()=>{
    const data = {
        name:name,
        mobile:mobile,
        email:date,
        age:"22/02/1996"

    }

    let url = "http://localhost:5000/users";
    let result = await fetch(url,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })

    result = result.json();
    console.log(result);
    

  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add User Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          <Stack direction="column" spacing={2}> {/* Stack ensures vertical layout */}
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e)=>setname(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Mobile Number"
        variant="outlined"
        onChange={(e)=>setmobile(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e)=>setemail(e.target.value)}
      />

      <div>
        <input type='date' style={{width:"300px", height:"50px"}} onChange={(e)=>setdate(e.target.value)} />
      </div>
    </Stack>
            
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
