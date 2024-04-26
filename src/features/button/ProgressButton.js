import React from 'react';
import Button from '@mui/material/Button';

export default function ProgressButton(props) {

  const { onClick, buttonLabel } = props;

  return (
    <Button style={{ width: "240px", backgroundColor: "#003E62", fontWeight: "bold" }} variant="contained" color="primary" onClick={onClick}>
      {buttonLabel}
    </Button>
  );
}