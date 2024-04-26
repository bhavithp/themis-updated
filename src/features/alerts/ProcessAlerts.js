import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from 'reactstrap';
import { styled } from '@mui/system';

const AlertDiv = styled('div')({
  width: '100%',
  '& > * + *': {
    marginTop: theme => theme.spacing(2),
  },
});


export default function ProcessAlert({ color, message }) {

  const [open, setOpen] = React.useState(true);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <AlertDiv>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <div>
          <Alert toggle={handleClose} color={color}>
            {message}
          </Alert>
        </div>
      </Snackbar>

    </AlertDiv>
  );
}
