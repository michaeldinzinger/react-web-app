import React from 'react';
import Button from '@mui/material/Button';

function NextButton({ onClick }) {
  return (
    <Button variant="contained" className="next-button" onClick={onClick}>
      Next
    </Button>
  );
}

export default NextButton;
