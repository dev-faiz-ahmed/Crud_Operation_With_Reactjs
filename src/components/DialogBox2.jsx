import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function DialogBox2({ user }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const getUserData = async() =>{
    const url = "http://localhost:5000/users"
    let result = await fetch(url);
    result= await result.json();
    
    
   }

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setMobile(user.mobile || '');
      setEmail(user.email || '');
      setDate(user.date || '');
    }
  }, [user, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    editUserApi();
    setOpen(false); // Close the dialog after saving
    getUserData()
  };

  const editUserApi = async () => {
    const data = {
      name: name,
      mobile: mobile,
      email: email,
      age: date // Assuming 'age' was intended to be a date
    };

    let url = "http://localhost:5000/users";
    let result = await fetch(`${url}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    result = await result.json();
    console.log(result);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit User Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="column" spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Mobile Number"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <input
                  type="date"
                  style={{ width: "300px", height: "50px" }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
