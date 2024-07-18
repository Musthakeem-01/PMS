import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  } 

  export default function CustomizedSnackbars(props) {
 
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
     props.onClose()
    };
  
    return (
      <div className="NotificationRoot">
        <Snackbar 
         anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={props.open}
        autoHideDuration={5000}
        onClose={handleClose}
        >
          <Alert color={props.color}>
            { 
            props.message.length > 0 && props.message[0].length > 1 ? 

              props.message[0].map((val)=>{
                return (
                  <div>
                   {val}
                  </div>
                )
              })
               : 
              props.message
          }            
          </Alert>
        </Snackbar>
      </div>
    );
  }
  